export const chatExists = (
  chats: { id: string; participants: string[] }[],
  participants: string[]
) => {
  return chats.find(
    (chat) =>
      chat.participants.length === participants.length &&
      [...chat.participants]
        .sort()
        .every((p, i) => p === [...participants].sort()[i])
  );
};

export const firebaseErrorHandler = (err_code: string): never => {
  if (!err_code) throw new Error("Something went wrong. Please try again.");

  switch (err_code) {
    case "auth/email-already-in-use":
      throw new Error("This email is already in use.");

    case "auth/invalid-email":
      throw new Error("The email address is invalid.");

    case "auth/user-disabled":
      throw new Error("This user account has been disabled.");

    case "auth/user-not-found":
      throw new Error("No account found with this email.");

    case "auth/wrong-password":
      throw new Error("Incorrect password.");

    case "auth/weak-password":
      throw new Error("Password should be at least 6 characters.");

    case "auth/too-many-requests":
      throw new Error("Too many attempts. Please try again later.");

    case "auth/operation-not-allowed":
      throw new Error("Email/password accounts are not enabled.");

    case "auth/missing-email":
      throw new Error("Please enter your email.");

    case "auth/internal-error":
      throw new Error("Internal error occurred. Try again later.");

    case "auth/missing-password":
      throw new Error("Please enter your password.");

    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
      throw new Error("Invalid login credentials.");

    case "auth/network-request-failed":
      throw new Error("Network error. Please check your internet connection.");

    default:
      throw new Error("Authentication failed. Please try again.");
  }
};
