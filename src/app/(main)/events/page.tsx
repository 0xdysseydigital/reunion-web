import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "Events — Reunion Cocktails + Provisions",
};

interface SanityEvent {
  _id: string;
  name: string;
  date: string;
  endTime?: string;
  description?: string;
  eventType?: string;
  image?: object;
}

const EVENTS_QUERY = `*[_type == "event"] | order(date asc) {
  _id, name, date, endTime, description, eventType, image
}`;

function formatDate(dateStr: string, endTimeStr?: string): string {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (!endTimeStr) return `${day} · ${time}`;

  const end = new Date(endTimeStr);
  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${day} · ${time} – ${endTime}`;
}

function EventRow({
  event,
  index,
  dimmed = false,
}: {
  event: SanityEvent;
  index: number;
  dimmed?: boolean;
}) {
  const imageLeft = index % 2 === 0;

  const photo = (
    <FadeIn
      direction={imageLeft ? "left" : "right"}
      amount={0.15}
      className={`w-full md:w-[45%] min-h-[280px] md:min-h-[480px] flex-shrink-0 relative overflow-hidden bg-brand-cream/5 ${dimmed ? "opacity-60" : ""}`}
    >
      {event.image ? (
        <Image
          src={urlFor(event.image).width(900).height(600).url()}
          alt={event.name}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-platypi text-[10px] tracking-[0.2em] uppercase text-brand-cream/20">
            No photo
          </span>
        </div>
      )}
    </FadeIn>
  );

  const content = (
    <div className={`flex-1 flex flex-col justify-center px-6 md:px-16 py-10 md:py-24 ${dimmed ? "opacity-60" : ""}`}>
      <FadeIn delay={0.1}>
        {event.eventType && (
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/35 mb-4">
            {event.eventType}
          </p>
        )}
        <h2 className="font-servus font-light text-[clamp(1.8rem,4vw,3rem)] leading-none tracking-wide uppercase text-brand-cream mb-4">
          {event.name}
        </h2>
        <p className="font-platypi text-[12px] tracking-[0.15em] uppercase text-brand-cream/50 mb-6">
          {formatDate(event.date, event.endTime)}
        </p>
        {event.description && (
          <p className="font-literata text-[18px] text-brand-cream/70 leading-relaxed max-w-md">
            {event.description}
          </p>
        )}
      </FadeIn>
    </div>
  );

  return (
    <section
      key={event._id}
      className={`flex flex-col border-b border-brand-cream/10 ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      aria-label={event.name}
    >
      {photo}
      {content}
    </section>
  );
}

export default async function EventsPage() {
  const events: SanityEvent[] = await client.fetch(EVENTS_QUERY, {}, { next: { revalidate: 30 } });

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="border-b border-brand-cream/10 px-6 md:px-10 py-14 md:py-20 flex flex-col items-center text-center">
        <FadeIn direction="none">
          <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-4">
            Hummelstown, PA
          </p>
        </FadeIn>
        <FadeIn direction="none" delay={0.1}>
          <h1 className="font-servus font-light text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-wide uppercase text-brand-cream/90">
            Events
          </h1>
        </FadeIn>
        <FadeIn direction="none" delay={0.2}>
          <p className="font-literata text-brand-cream/50 text-[18px] mt-6 max-w-lg leading-relaxed">
            Special evenings, live music, and reasons to gather. Check back often.
          </p>
        </FadeIn>
      </div>

      {/* Upcoming events */}
      {upcoming.length > 0 ? (
        upcoming.map((event, i) => (
          <EventRow key={event._id} event={event} index={i} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-28 px-6 border-b border-brand-cream/10">
          <FadeIn direction="none">
            <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/30 text-center">
              Nothing scheduled yet
            </p>
            <p className="font-literata text-brand-cream/40 text-[18px] mt-4 text-center max-w-sm leading-relaxed">
              Events are added regularly. Follow us on Instagram for the latest announcements.
            </p>
          </FadeIn>
        </div>
      )}

      {/* Past events */}
      {past.length > 0 && (
        <>
          <div className="px-6 md:px-10 py-10 border-b border-brand-cream/10">
            <FadeIn direction="none">
              <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/30">
                Past Events
              </p>
            </FadeIn>
          </div>
          {past.map((event, i) => (
            <EventRow key={event._id} event={event} index={i} dimmed />
          ))}
        </>
      )}

    </div>
  );
}
