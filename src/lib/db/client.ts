import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | undefined;

function getSql() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    _sql = neon(url);
  }
  return _sql;
}

export const sql: ReturnType<typeof neon> = ((strings: TemplateStringsArray, ...values: unknown[]) => {
  return getSql()(strings, ...values);
}) as ReturnType<typeof neon>;
