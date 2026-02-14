import Link from "next/link";
import type { RoleCardData } from "@/lib/types";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

interface RolesListProps {
  roles: RoleCardData[];
}

function RoleCard({ role }: { role: RoleCardData }) {
  return (
    <Link
      href={`/volunteer/${role.slug}`}
      className="group rounded-xl border border-grey-700 bg-grey-900 p-6 transition-colors hover:border-accent"
    >
      <p className="font-body text-xs font-medium uppercase tracking-wider text-grey-400">
        {role.team}
      </p>
      <h3 className="mt-2 font-heading text-lg font-semibold text-white group-hover:text-accent-hover transition-colors">
        {role.name}
      </h3>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-grey-400">
        <span className="capitalize">{role.workMode}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{role.region}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{role.workload} hrs/week</span>
      </div>
    </Link>
  );
}

export default function RolesList({ roles }: RolesListProps) {
  if (roles.length === 0) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <Text className="mt-4 text-grey-400">
          We are not recruiting personnel at the moment. Check back soon or sign up to our Talent Network.
        </Text>
        <div className="mt-8">
          <Button href="#talent-network" variant="primary">
            Join Talent Network
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {roles.map((role) => (
        <RoleCard key={role._id} role={role} />
      ))}
    </div>
  );
}
