import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  const t = useTranslations("SessionLevel");
  const details = `${session.startTime} · ${t(session.level)} · ${session.speaker}`;

  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Text fontWeight="medium" color="var(--text-primary)" truncate>
            {session.title}
          </Text>
          {/* Truncated in narrow blocks; the title shows it all on hover. */}
          <Text color="var(--text-muted)" truncate title={details}>
            {details}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
