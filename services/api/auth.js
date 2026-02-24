const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUserOnboardingGlobals(token) {
    try {
        const endpoint = API_URL
            ? `${API_URL}/api/globals/user-onboarding`
            : "/api/globals/user-onboarding";

        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(endpoint, {
            method: "GET",
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Failed to load onboarding data");
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("Fetch onboarding globals error:", error);
        return {
            success: false,
            error: error.message || "Failed to load onboarding data",
        };
    }
}

export async function registerUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/api/users/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Registration failed");
        }

        return {
            success: true,
            token: data.token,
            user: data.user,
            exp: data.exp,
            message: data.message,
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            error: error.message || "Registration failed",
        };
    }
}


export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Login failed");
        }

        return {
            success: true,
            token: data.token,
            user: data.user,
            exp: data.exp,
            message: data.message,
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            error: error.message || "Login failed",
        };
    }
}

export async function createUserProfile(profileData, token) {
    try {
        const response = await fetch(`${API_URL}/api/user-profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Profile creation failed");
        }

        return {
            success: true,
            profile: data.doc,
            message: data.message,
        };
    } catch (error) {
        console.error("Profile creation error:", error);
        return {
            success: false,
            error: error.message || "Profile creation failed",
        };
    }
}

export async function updateMyProfile(profileDetails, profilePictureFile, token) {
    try {
        if (!token) {
            throw new Error("Missing authentication token");
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify(profileDetails || {}));

        if (profilePictureFile) {
            formData.append("profilePicture", profilePictureFile);
        }

        const endpoints = API_URL
            ? [`${API_URL}/api/user-profile/update-me`, `${API_URL}/user-profile/update-me`]
            : ["/api/user-profile/update-me"];

        let lastError = "Profile update failed";

        for (let index = 0; index < endpoints.length; index += 1) {
            const endpoint = endpoints[index];

            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            const rawText = await response.text();
            let data = null;

            try {
                data = rawText ? JSON.parse(rawText) : null;
            } catch {
                data = null;
            }

            if (response.ok) {
                return {
                    success: true,
                    profile: data?.doc || data,
                    message: data?.message || "Profile updated successfully",
                };
            }

            const apiMessage = data?.message || rawText || "Profile update failed";
            lastError = apiMessage;

            const isLastEndpoint = index === endpoints.length - 1;
            if (!isLastEndpoint && (response.status === 404 || response.status >= 500)) {
                continue;
            }

            throw new Error(apiMessage);
        }

        throw new Error(lastError);
    } catch (error) {
        console.error("Profile update error:", error);
        return {
            success: false,
            error: error.message || "Profile update failed",
        };
    }
}

export async function forgotPassword(email) {
    try {
        const response = await fetch(`${API_URL}/api/users/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Failed to send reset email");
        }

        return {
            success: true,
            message: data.message || "Reset code sent to your email",
        };
    } catch (error) {
        console.error("Forgot password error:", error);
        return {
            success: false,
            error: error.message || "Failed to send reset email",
        };
    }
}

export async function resetPassword(token, password) {
    try {
        const response = await fetch(`${API_URL}/api/users/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Failed to reset password");
        }

        return {
            success: true,
            message: data.message || "Password reset successfully",
        };
    } catch (error) {
        console.error("Reset password error:", error);
        return {
            success: false,
            error: error.message || "Failed to reset password",
        };
    }
}

export async function verifyOTP(email, otp) {
    try {
        const response = await fetch(`${API_URL}/api/users/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (!response.ok || data.errors) {
            throw new Error(data?.errors?.message || data?.message || "Invalid OTP code");
        }

        return {
            success: true,
            token: data.token || data.access_token,
            message: data.message || "OTP verified successfully",
        };
    } catch (error) {
        console.error("OTP verification error:", error);
        return {
            success: false,
            error: error.message || "Failed to verify OTP",
        };
    }
}

