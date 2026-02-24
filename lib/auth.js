import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const DEFAULT_PROFILE_IMAGE = "https://github.com/shadcn.png";

async function ensureSocialUserProfile(accessToken, socialImageUrl) {
    if (!accessToken) return;

    const resolvedProfileImage = socialImageUrl || DEFAULT_PROFILE_IMAGE;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                onboardInfo: {
                    age: "18-24",
                    country: "",
                    purpose: "",
                    goalTime: 10,
                    userSource: "google",
                    languageStrength: "",
                },
                profilePictureUrl: resolvedProfileImage,
            }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            const message = (data?.message || "").toLowerCase();
            if (!message.includes("already") && !message.includes("exist")) {
                console.warn("Social profile auto-create skipped:", data?.message || "request failed");
            }
        }
    } catch (error) {
        console.warn("Social profile auto-create error:", error?.message || error);
    }
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }

                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data?.message || "Authentication failed");
                    }

                    if (data.token && data.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            role: data.user.role,
                            accessToken: data.token,
                            exp: data.exp,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    throw new Error(error.message || "Authentication failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // Google/social sign in
            if (account && account.provider === "google") {
                console.log("Account :: ", account)
                try {
                    const requestBody = {
                        email: user.email,
                        sid: account.providerAccountId,
                        provider: "google",
                        socialMediaPictureUrl: user.image || "",
                        token: account.access_token || "",
                    };

                    // console.log("Google OAuth Account Data:", {
                    //     providerAccountId: account.providerAccountId,
                    //     access_token: account.access_token ? "exists" : "missing",
                    // });
                    console.log("Sending to social-login API:", requestBody);

                    // Call backend social login API
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/users/social-login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(requestBody),
                        }
                    );

                    const data = await response.json();
                    console.log("Data response social :: ", data)

                    // Check for errors in response
                    if (!response.ok || data.errors) {
                        console.error("Social login API error:", data.errors || data);
                        return {
                            ...token,
                            error: "SocialLoginFailed",
                        };
                    }

                    await ensureSocialUserProfile(data.token, user?.image || "");

                    return {
                        ...token,
                        accessToken: data.token,
                        exp: data.exp,
                        userId: data.user?.id || user.id,
                        role: data.user?.role,
                        userImage: user?.image || DEFAULT_PROFILE_IMAGE,
                    };
                } catch (error) {
                    console.error("Social login error:", error);
                    return {
                        ...token,
                        error: "SocialLoginFailed",
                    };
                }
            }

            // Initial credentials sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    exp: user.exp,
                    userId: user.id,
                    role: user.role,
                    userImage: token?.userImage || DEFAULT_PROFILE_IMAGE,
                };
            }

            // Check if token has expired
            if (token.exp && Date.now() / 1000 > token.exp) {
                // Token expired - user needs to re-authenticate
                return {
                    ...token,
                    error: "TokenExpired",
                };
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.userId;
                session.user.role = token.role;
                session.user.image = token.userImage || DEFAULT_PROFILE_IMAGE;
                session.accessToken = token.accessToken;
                session.error = token.error;
            }
            console.log("Session :: ", session)
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60, // 2 hours (matching API session duration)
    },
    secret: process.env.NEXTAUTH_SECRET,
};
