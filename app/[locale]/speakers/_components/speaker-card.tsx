import { Card, CardContent, CardTitle } from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  name: string;
  sessions: Pick<Session, "id" | "title" | "startTime">[];
}

export function SpeakerCard({ name, sessions }: SpeakerCardProps) {
  return (
    <Card as="article" height="full">
      <CardContent gap="4">
        <CardTitle as="h2" fontSize="md">
          {name}
        </CardTitle>

        <Flex
          as="ul"
          role="list"
          direction="column"
          gap="1"
          listStyleType="none"
        >
          {sessions.map((session) => (
            <li key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  as="span"
                  direction="column"
                  gap="1"
                  paddingY="2"
                  _hover={{ color: "var(--accent-hex)" }}
                >
                  <Text as="span" fontSize="sm" color="var(--text-secondary)">
                    <time dateTime={session.startTime}>
                      {session.startTime}
                    </time>
                  </Text>
                  <Text as="span" fontSize="sm" fontWeight="medium">
                    {session.title}
                  </Text>
                </Flex>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
