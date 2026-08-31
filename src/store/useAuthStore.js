import { create } from 'zustand';

const DEFAULT_USER = {
  id: 'usr_aur_99182',
  name: 'Jane Anderson',
  email: 'jane.anderson@example.com',
  phone: '+1 (555) 234-5678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  tier: 'VIP Obsidian Tier',
  points: 4850,
  emailVerified: true,
  phoneVerified: true,
  twoFactorEnabled: false,
  joinedDate: 'March 2024'
};

const DEFAULT_SESSIONS = [
  {
    id: 'sess_1',
    device: 'Apple MacBook Pro 16" (M3 Max)',
    browser: 'Chrome 128.0 (macOS)',
    ip: '198.51.100.42',
    location: 'San Francisco, CA, USA',
    current: true,
    lastActive: 'Active Now'
  },
  {
    id: 'sess_2',
    device: 'Apple iPhone 15 Pro',
    browser: 'Mobile Safari 17.4 (iOS)',
    ip: '198.51.100.89',
    location: 'San Francisco, CA, USA',
    current: false,
    lastActive: '2 hours ago'
  },
  {
    id: 'sess_3',
    device: 'Apple iPad Pro 12.9"',
    browser: 'Safari (iPadOS)',
    ip: '198.51.100.12',
    location: 'Los Angeles, CA, USA',
    current: false,
    lastActive: '3 days ago'
  }
];

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('aurastore_user') || 'null'),
  isAuthenticated: localStorage.getItem('aurastore_auth') === 'true',
  rememberMe: localStorage.getItem('aurastore_remember') !== 'false',
  
  // Security & Lockout state
  failedAttempts: 0,
  isLockedOut: false,
  lockoutEndTime: null,

  // Active Sessions / Login History
  sessions: JSON.parse(localStorage.getItem('aurastore_sessions') || JSON.stringify(DEFAULT_SESSIONS)),

  // 2FA state
  twoFactorSecret: 'JBSWY3DPEHPK3PXP',
  backupCodes: ['8941-2094', '4412-8871', '6021-9934', '1182-3091', '7721-4902'],

  // Password in state for demo check
  mockPassword: localStorage.getItem('aurastore_mock_password') || 'AuraSecret2026!',

  // Lockout handler
  recordFailedAttempt: () => {
    const attempts = get().failedAttempts + 1;
    if (attempts >= 3) {
      const lockUntil = Date.now() + 60 * 1000; // 60 seconds lockout
      set({ failedAttempts: attempts, isLockedOut: true, lockoutEndTime: lockUntil });
      return { locked: true, remainingSecs: 60 };
    }
    set({ failedAttempts: attempts });
    return { locked: false, attemptsRemaining: 3 - attempts };
  },

  resetLockout: () => {
    set({ failedAttempts: 0, isLockedOut: false, lockoutEndTime: null });
  },

  // Login
  login: (email, password, remember = true) => {
    // Check lockout
    if (get().isLockedOut) {
      const now = Date.now();
      if (get().lockoutEndTime && now < get().lockoutEndTime) {
        const remaining = Math.ceil((get().lockoutEndTime - now) / 1000);
        return { success: false, error: `Account temporarily locked for security. Try again in ${remaining}s.`, locked: true };
      } else {
        get().resetLockout();
      }
    }

    // Verify password simulation
    if (password !== get().mockPassword && password !== 'password' && password !== '123456') {
      const lockoutStatus = get().recordFailedAttempt();
      if (lockoutStatus.locked) {
        return { success: false, error: 'Maximum failed attempts reached. Account locked for 60 seconds.', locked: true };
      }
      return { success: false, error: `Incorrect credentials. ${lockoutStatus.attemptsRemaining} attempt(s) remaining before lockout.` };
    }

    // If 2FA enabled, signal 2FA challenge needed
    if (get().user?.twoFactorEnabled) {
      return { success: false, requires2FA: true };
    }

    // Success
    get().resetLockout();
    const updatedUser = {
      ...get().user,
      email: email.trim().toLowerCase()
    };

    const newSession = {
      id: 'sess_' + Date.now(),
      device: 'Current Web Browser',
      browser: 'Chrome / Edge',
      ip: '198.51.100.42',
      location: 'Local Session',
      current: true,
      lastActive: 'Active Now'
    };

    const updatedSessions = [newSession, ...get().sessions.map(s => ({ ...s, current: false }))];

    if (remember) {
      localStorage.setItem('aurastore_user', JSON.stringify(updatedUser));
      localStorage.setItem('aurastore_auth', 'true');
      localStorage.setItem('aurastore_remember', 'true');
      localStorage.setItem('aurastore_sessions', JSON.stringify(updatedSessions));
    }

    set({ user: updatedUser, isAuthenticated: true, rememberMe: remember, sessions: updatedSessions });
    return { success: true };
  },

  // 2FA Verification during login
  verify2FALogin: (code) => {
    if (code === '123456' || code.length === 6 || get().backupCodes.includes(code)) {
      get().resetLockout();
      localStorage.setItem('aurastore_auth', 'true');
      set({ isAuthenticated: true });
      return { success: true };
    }
    return { success: false, error: 'Invalid authenticator code. Try 123456 or a backup code.' };
  },

  // OTP Login (Email or Phone)
  loginWithOTP: (destination, code) => {
    if (code !== '123456' && code !== '888888') {
      return { success: false, error: 'Invalid verification code. Use demo code 123456.' };
    }

    get().resetLockout();
    const isEmail = destination.includes('@');
    const updatedUser = {
      ...get().user,
      email: isEmail ? destination : get().user.email,
      phone: !isEmail ? destination : get().user.phone,
      emailVerified: isEmail ? true : get().user.emailVerified,
      phoneVerified: !isEmail ? true : get().user.phoneVerified
    };

    localStorage.setItem('aurastore_user', JSON.stringify(updatedUser));
    localStorage.setItem('aurastore_auth', 'true');
    set({ user: updatedUser, isAuthenticated: true });
    return { success: true };
  },

  // OAuth Login (Google / Apple)
  loginWithOAuth: (provider) => {
    get().resetLockout();
    const updatedUser = {
      ...get().user,
      name: provider === 'google' ? 'Jane Anderson (Google)' : 'Jane Anderson (Apple)',
      email: provider === 'google' ? 'jane.anderson@gmail.com' : 'jane.anderson@icloud.com',
      emailVerified: true
    };

    localStorage.setItem('aurastore_user', JSON.stringify(updatedUser));
    localStorage.setItem('aurastore_auth', 'true');
    set({ user: updatedUser, isAuthenticated: true });
    return { success: true };
  },

  // Signup
  signup: (formData) => {
    const newUser = {
      id: 'usr_aur_' + Math.floor(10000 + Math.random() * 90000),
      name: formData.name,
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone || '+1 (555) 000-0000',
      avatar: null, // Default to null so user can upload their custom photo or see their Initials badge
      tier: 'Silver Member',
      points: 250,
      emailVerified: false,
      phoneVerified: false,
      twoFactorEnabled: false,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    localStorage.setItem('aurastore_user', JSON.stringify(newUser));
    localStorage.setItem('aurastore_auth', 'true');
    localStorage.setItem('aurastore_mock_password', formData.password);

    set({ user: newUser, isAuthenticated: true, mockPassword: formData.password });
    return { success: true, user: newUser };
  },

  // Update Profile Avatar
  updateAvatar: (avatarUrl) => {
    const current = get().user;
    if (!current) return;
    const updated = { ...current, avatar: avatarUrl };
    localStorage.setItem('aurastore_user', JSON.stringify(updated));
    set({ user: updated });
  },

  // Logout
  logout: () => {
    localStorage.removeItem('aurastore_auth');
    set({ isAuthenticated: false });
  },

  // Email & Phone Verification
  verifyEmailCode: (code) => {
    if (code === '123456' || code.length === 6) {
      const updated = { ...get().user, emailVerified: true };
      localStorage.setItem('aurastore_user', JSON.stringify(updated));
      set({ user: updated });
      return { success: true };
    }
    return { success: false, error: 'Invalid code. Use 123456 for demo verification.' };
  },

  verifyPhoneCode: (code) => {
    if (code === '123456' || code.length === 6) {
      const updated = { ...get().user, phoneVerified: true };
      localStorage.setItem('aurastore_user', JSON.stringify(updated));
      set({ user: updated });
      return { success: true };
    }
    return { success: false, error: 'Invalid code. Use 123456 for demo verification.' };
  },

  // Password management
  changePassword: (currentPassword, newPassword) => {
    if (currentPassword !== get().mockPassword && currentPassword !== 'password') {
      return { success: false, error: 'Current password does not match.' };
    }
    localStorage.setItem('aurastore_mock_password', newPassword);
    set({ mockPassword: newPassword });
    return { success: true };
  },

  resetPassword: (newPassword) => {
    localStorage.setItem('aurastore_mock_password', newPassword);
    set({ mockPassword: newPassword });
    return { success: true };
  },

  // 2FA Management
  toggle2FA: (enable, code) => {
    if (enable) {
      if (code !== '123456' && code !== '888888') {
        return { success: false, error: 'Invalid verification code. Enter 123456.' };
      }
      const updated = { ...get().user, twoFactorEnabled: true };
      localStorage.setItem('aurastore_user', JSON.stringify(updated));
      set({ user: updated });
      return { success: true };
    } else {
      const updated = { ...get().user, twoFactorEnabled: false };
      localStorage.setItem('aurastore_user', JSON.stringify(updated));
      set({ user: updated });
      return { success: true };
    }
  },

  // Session Management
  revokeSession: (sessionId) => {
    const updated = get().sessions.filter(s => s.id !== sessionId);
    localStorage.setItem('aurastore_sessions', JSON.stringify(updated));
    set({ sessions: updated });
  },

  revokeAllSessions: () => {
    const current = get().sessions.filter(s => s.current);
    localStorage.setItem('aurastore_sessions', JSON.stringify(current));
    set({ sessions: current });
  },

  // Delete Account
  deleteAccount: (password) => {
    if (password !== get().mockPassword && password !== 'password' && password !== '123456') {
      return { success: false, error: 'Incorrect password. Account deletion aborted.' };
    }
    localStorage.clear();
    set({
      user: null,
      isAuthenticated: false,
      sessions: []
    });
    return { success: true };
  }
}));
