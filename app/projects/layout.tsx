'use client'

import PasswordGate from '../../components/PasswordGate'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PasswordGate
      title="Case Studies"
      description="Enter the password to view these protected case studies."
      correctPassword="design2026"
      submitLabel="Open case studies"
      storageKey="projects_case_study_auth_token"
    >
      {children}
    </PasswordGate>
  )
}
