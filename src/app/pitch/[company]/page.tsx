import { Suspense } from "react";
import { PitchDeck } from "@/components/pitch/deck";

/** `/pitch/Autobedrijf De Vries&Mark` greets Mark and names the dealership throughout the deck. */
async function PersonalDeck({ params }: { params: PageProps<"/pitch/[company]">["params"] }) {
  const raw = decodeURIComponent((await params).company);
  const split = raw.lastIndexOf("&");
  const [companyName, firstName] = split > 0 ? [raw.slice(0, split), raw.slice(split + 1)] : [raw, undefined];
  return <PitchDeck companyName={companyName.trim()} firstName={firstName?.trim() || undefined} />;
}

export default function PersonalPitchPage({ params }: PageProps<"/pitch/[company]">) {
  return (
    <Suspense>
      <PersonalDeck params={params} />
    </Suspense>
  );
}
