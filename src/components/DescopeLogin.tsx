"use client";

import { AuthProvider, Descope } from "@descope/react-sdk";

export function DescopeLogin({
  projectId,
  redirectTo,
}: {
  projectId: string;
  redirectTo: string;
}) {
  return (
    <AuthProvider projectId={projectId}>
      <Descope
        flowId="sign-up-or-in"
        theme="light"
        onSuccess={() => {
          window.location.assign(redirectTo);
        }}
        onError={err => {
          void err;
        }}
      />
    </AuthProvider>
  );
}
