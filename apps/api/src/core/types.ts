export type UUID = string;

export type AuthContext = {
  userId: UUID;
  role: 'member' | 'admin';
  tokenId?: string;
  email?: string;
};

export type RequestContext = {
  auth: AuthContext;
  requestId: string;
};

export type FeatureFlags = {
  supportAi: boolean;
  liveResearch: boolean;
  emailNotifications: boolean;
  paymentSafetyMessaging: boolean;
  groupDiscussions: boolean;
};
