export function formatDomain(domain: string): string {
  // Remove any protocol if present
  let formattedDomain = domain.replace(/^(https?:\/\/)/, '');
  
  // Remove trailing slashes
  formattedDomain = formattedDomain.replace(/\/$/, '');
  
  // Add https protocol
  return `https://${formattedDomain}`;
}

export function setStoreDomain(domain: string): void {
  const formattedDomain = formatDomain(domain);
  localStorage.setItem('apiDomain', formattedDomain);
}

export function getStoreDomain(): string {
  return localStorage.getItem('apiDomain') || 'https://demo.s3r.store';
}

export function clearStoreDomain(): void {
  localStorage.removeItem('apiDomain');
}