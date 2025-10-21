export function typedData<T>(data: unknown): T {
  return data as T;
}

export function findDropTarget<T>(
  dropTargets: Array<{ data: unknown }>,
  type: string
): T | undefined {
  return dropTargets.find((t) => t.data && (t.data as any).type === type)
    ?.data as T;
}
