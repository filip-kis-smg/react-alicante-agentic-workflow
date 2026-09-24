-- Attendees need to know how deep a session goes before picking it. `level`
-- is a closed set of three values, so an enum keeps it out of app-level
-- validation and gives `pnpm db:types` a proper union type, same reasoning
-- as `session_track` in 20260918100000_session_track_enum.sql.
--
-- `create type` has no `if not exists`, so catch duplicate_object instead:
-- re-running this file won't fail on a type that already exists.

do $$
begin
  create type public.session_level as enum ('beginner', 'intermediate', 'advanced');
exception
  when duplicate_object then null;
end $$;

-- Add nullable first so existing rows don't block the column add, backfill
-- every seeded row by id, then close the gate with `set not null`. No
-- permanent default: every session must be assigned a level explicitly going
-- forward, not silently inherit one.

alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions set level = 'beginner' where id = 'opening-keynote';
update public.sessions set level = 'intermediate' where id = 'build-your-agentic-workflow';
update public.sessions set level = 'advanced' where id = 'server-components-deep-dive';
update public.sessions set level = 'advanced' where id = 'rsc-payload-budget';
update public.sessions set level = 'intermediate' where id = 'agent-context-windows';
update public.sessions set level = 'advanced' where id = 'micro-frontends-2026';
update public.sessions set level = 'intermediate' where id = 'testing-ai-generated-code';
update public.sessions set level = 'beginner' where id = 'closing-panel';

alter table public.sessions
  alter column level set not null;
