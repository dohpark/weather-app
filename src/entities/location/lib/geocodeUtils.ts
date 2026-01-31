/**
 * "청주시상당구" -> ["청주시", "상당구"]
 * "안양시동안구" -> ["안양시", "동안구"]
 */
export function splitCompoundAdmin(token: string): string[] {
  const t = token.trim()
  if (!t) return []

  const parts = t.match(
    /[가-힣]+?(?:특별시|광역시|특례시|자치시|도|시|군|구|읍|면|동|리)/g
  )

  return parts?.length ? parts : [t]
}
