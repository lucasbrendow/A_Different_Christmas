export function readStringEnv(value: string | undefined, fallback: string) {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : fallback;
}

export function readBooleanEnv(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue === 'true' || normalizedValue === '1') {
    return true;
  }

  if (normalizedValue === 'false' || normalizedValue === '0') {
    return false;
  }

  return fallback;
}
