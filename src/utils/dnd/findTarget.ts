export function findDropTarget<T>(
  dropTargets: Array<{ data: unknown }>,
  predicate: (data: unknown) => data is T
): T | undefined {
  const found = dropTargets.find((t) => predicate(t.data));
  return found?.data as T | undefined;
}
