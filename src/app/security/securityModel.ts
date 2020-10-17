export interface SecurityModel {
  userName: string;
  isAuthenticated: boolean;
  bearerToken: string;
  canAccessTODO: boolean;
  canAccessDashboard: boolean;
  canAccessAdmin: boolean;
}
