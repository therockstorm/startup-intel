// https://developer.mozilla.org/en-US/docs/Web/API/XPathResult#constants
const TYPES = {
  any: 0,
  anyUnorderedNode: 8,
  boolean: 3,
  firstOrderedNode: 9,
  number: 1,
  orderedNodeIterator: 5,
  orderedNodeSnapshot: 7,
  string: 2,
  unorderedNodeIterator: 4,
  unorderedNodeSnapshot: 6,
};

type Props = Readonly<{
  // eslint-disable-next-line @typescript-eslint/ban-types
  context?: Node | null;
  document: Document;
  path: string;
}>;

export function queryByXPath(props: Props): XPathResult {
  return byXPath({ ...props, type: TYPES.firstOrderedNode });
}

export function queryByXPathAll(props: Props): XPathResult {
  return byXPath({ ...props, type: TYPES.orderedNodeIterator });
}

function byXPath({
  context,
  document,
  path,
  type,
}: Props & { type: number }): XPathResult {
  return document.evaluate(path, context ?? document, null, type, null);
}
