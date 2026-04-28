type PlainTextSegment = {
  text: string;
  redactedText?: never;
  redactionLabel?: never;
};

type RedactedTextSegment = {
  text?: never;
  redactedText: string;
  redactionLabel: string;
};

export type RedactableTextSegment = PlainTextSegment | RedactedTextSegment;

export function isRedactedSegment(
  segment: RedactableTextSegment,
): segment is RedactedTextSegment {
  return segment.redactedText !== undefined;
}
