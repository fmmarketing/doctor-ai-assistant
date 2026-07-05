# DECISIONS.md - Decisiones de Arquitectura

## Milestone 2 - Authentication

### Signup abierto solo para desarrollo/demo

**Decisión:** El endpoint `/signup` está abierto para que cualquier persona pueda crear cuenta.

**Razón:** Durante el desarrollo y demo, necesitamos crear cuentas de prueba fácilmente.

**Plan producción:** En producción se evaluará:
- Invitación manual por email
- Aprobación admin antes de activar cuenta
- Sistema de códigos de invitación

**Fecha:** 2026-07-05
**Estado:** Solo desarrollo/demo

---

### Service Role Key no se usa

**Decisión:** La `SUPABASE_SERVICE_ROLE_KEY` no se utiliza en ninguna parte del código.

**Razón:** Para autenticación y perfiles, la `anon key` con RLS es suficiente y más segura.

**Regla:** Solo usar service role en casos excepcionales que lo requieran (migraciones, backups, etc.)

---

### Profile creation después de signup

**Decisión:** El perfil se crea automáticamente después del signup usando un Server Action.

**Mecanismo:** 
1. Supabase crea el usuario en `auth.users`
2. La app llama a `createProfile` después del signup
3. Se usa `upsert` para evitar duplicados
4. RLS en `profiles` asegura que cada usuario solo vea su perfil

---

### Redirect loops prevenidos

**Decisión:** El middleware maneja redirects de forma segura.

**Lógica:**
- `/login`, `/signup` → redirige a `/dashboard` si ya hay sesión
- `/dashboard`, `/patients`, `/encounters`, `/settings` → redirige a `/login` si no hay sesión
- No hay循环 porque los checks son mutuamente excluyentes

---

## Milestone 3 - Patients (Próximo)

*Pendiente de documentar después del Milestone 3*
