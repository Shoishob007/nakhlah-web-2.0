# NextAuth Integration Guide

## Overview
This application uses NextAuth.js for authentication with custom API integration. Sessions are managed via JWT tokens stored in NextAuth sessions.

## Configuration

### Environment Variables
Add these to your `.env` file:

```env
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production-min-32-chars
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://nakhlah-api.nakhlah.net
```

**Important**: Change `NEXTAUTH_SECRET` to a secure random string in production. Generate one with:
```bash
openssl rand -base64 32
```

## API Endpoints

### Registration
- **URL**: `POST /api/users/sign-in`
- **Body**: `{ email, password }`
- **Response**: Returns `{ token, user, exp, message }`

### Login
- **URL**: `POST /api/users/login`
- **Body**: `{ email, password }`
- **Response**: Returns `{ token, user, exp, message }`

## How It Works

### 1. User Registration (Onboarding)
- User completes onboarding steps
- On AccountStep completion, calls `registerUser()` from `lib/authUtils.js`
- Auto-login via NextAuth after successful registration
- Redirects to dashboard

### 2. User Login
- User enters credentials on `/auth/login`
- NextAuth `signIn()` sends credentials to `/api/auth/[...nextauth]`
- Credentials provider validates against your API
- JWT token stored in NextAuth session
- Redirects to home page

### 3. Protected Routes
- Middleware (`middleware.js`) checks authentication on all routes
- Redirects to `/auth/login` if no valid session
- Public routes: `/auth/*`, `/onboarding`, `/get-started`

### 4. API Calls with Session Token
Example from `lesson/page.jsx`:

```javascript
import { useSession } from "next-auth/react";
import { getSessionToken } from "@/lib/authUtils";

const { data: session } = useSession();
const token = getSessionToken(session);

const response = await fetch(apiUrl, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

## Session Structure

NextAuth session object includes:
```javascript
{
  user: {
    id: "user-uuid",
    email: "user@example.com",
    name: "User Name",
    role: "user"
  },
  accessToken: "jwt-token-from-your-api",
  expires: "2026-02-18T10:00:00.000Z"
}
```

## Utility Functions

### `lib/authUtils.js`

- **`registerUser(email, password)`**: Register new user via API
- **`getSessionToken(session)`**: Extract token from NextAuth session
- **`isSessionValid(session)`**: Check if session exists and is not expired

## Usage Examples

### Check Authentication in Component

```javascript
"use client";
import { useSession } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please login</div>;
  
  return <div>Hello {session.user.email}</div>;
}
```

### Manual Login

```javascript
import { signIn } from "next-auth/react";

const result = await signIn("credentials", {
  email: "user@example.com",
  password: "password123",
  redirect: false
});

if (result?.ok) {
  // Login successful
}
```

### Manual Logout

```javascript
import { signOut } from "next-auth/react";

await signOut({ callbackUrl: "/auth/login" });
```

### Get Current Session Server-Side

```javascript
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  // Use session.accessToken for API calls
}
```

## Token Expiration

- API tokens expire after 2 hours (7200 seconds)
- NextAuth session maxAge matches API expiration
- Expired sessions automatically redirect to login
- Session refresh handled automatically by NextAuth

## Security Notes

1. **Never expose `NEXTAUTH_SECRET`** - keep it secret
2. Tokens are stored in HTTP-only cookies (secure by default)
3. CSRF protection enabled automatically
4. Middleware protects all routes by default
5. Session validation on every protected API call

## Troubleshooting

### "Session Expired" errors
- Check API token expiration matches NextAuth session duration
- Verify `NEXTAUTH_SECRET` is set correctly
- Clear browser cookies and re-login

### Authentication Loop
- Ensure middleware public routes are configured correctly
- Check callback URLs in auth config
- Verify API endpoints return correct response structure

### Token not working
- Confirm token is passed in `Authorization: Bearer <token>` format
- Check API endpoint authentication requirements
- Verify session is loaded before making API calls

## Files Modified/Created

- `lib/auth.js` - NextAuth configuration
- `lib/authUtils.js` - Auth helper functions
- `app/api/auth/[...nextauth]/route.js` - NextAuth API handler
- `components/SessionProvider.jsx` - Session context wrapper
- `middleware.js` - Route protection
- `app/layout.jsx` - SessionProvider integration
- `app/auth/login/page.jsx` - Login page with NextAuth
- `app/onboarding/page.jsx` - Registration flow
- `app/(dashboard)/lesson/page.jsx` - Protected route example
