import ReservationBooker from "@/components/ReservationBooker";

export const metadata = {
  title: "Reservations — Reunion Cocktails + Provisions",
};

export default function ReservationsPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <div className="border-b border-brand-cream/10 px-10 py-20 flex flex-col items-center text-center">
        <p className="font-platypi text-[11px] tracking-[0.3em] uppercase text-brand-cream/40 mb-4">
          Hummelstown, PA
        </p>
        <h1 className="font-servus font-light text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-wide uppercase text-brand-cream/90">
          Reservations
        </h1>
        <p className="font-literata text-brand-cream/50 text-[15px] mt-6 max-w-md leading-relaxed">
          Reserve your table online. For parties of 8 or more, please contact us directly.
        </p>
      </div>

      {/* Booker */}
      <div className="w-full pt-12 pb-20">
        <ReservationBooker />
      </div>

    </div>
  );
}
