import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  email: z.email(),
  isOnline: z.boolean().optional(),
  profilePic: z.url().optional(),
  lastSeen: z.string(),
  uid: z.string(),
});

export const LastMessageSchema = z.object({
  text: z.string(),
  timestamp: z.string(),
  senderId: z.string(),
});

export const ChatSchema = z.object({
  participants: z.array(z.string()),
  lastMessage: LastMessageSchema.optional(),
  createdAt: z.string(),
  type: z.enum(["direct", "group"]),
});

export const MessageSchema = z.object({
  text: z.string(),
  senderId: z.string(),
  timestamp: z.string(),
  edited: z.boolean().optional(),
  replyTo: z.null().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type LastMessage = z.infer<typeof LastMessageSchema>;
export type Chat = z.infer<typeof ChatSchema>;
export type Message = z.infer<typeof MessageSchema>;
