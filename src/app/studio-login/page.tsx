import { studioLogin } from "./actions";

export const metadata = {
  title: "Studio — Reunion Cocktails + Provisions",
};

export default async function StudioLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-brand-bg">
      <div className="w-full max-w-sm flex flex-col items-center gap-10">

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-platypi text-[10px] tracking-[0.35em] uppercase text-brand-cream/35">
            Content Studio
          </p>
          <h1 className="font-servus font-light text-[2rem] leading-none tracking-widest uppercase text-brand-cream/90">
            Reunion
          </h1>
        </div>

        {/* Form */}
        <form action={studioLogin} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoFocus
              autoComplete="current-password"
              className="w-full bg-transparent border border-brand-cream/20 px-4 py-3 font-literata text-[15px] text-brand-cream placeholder:text-brand-cream/25 outline-none focus:border-brand-cream/50 transition-colors duration-200"
            />
            {error && (
              <p className="font-platypi text-[10px] tracking-[0.1em] uppercase text-brand-cream/40">
                Incorrect password
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full border border-brand-cream/80 px-6 py-3 font-platypi text-[11px] tracking-[0.25em] uppercase text-brand-cream/90 hover:bg-brand-cream hover:text-brand-bg transition-colors duration-200"
          >
            Enter
          </button>
        </form>

      </div>
    </div>
  );
}
