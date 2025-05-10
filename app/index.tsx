import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function IndexPage() {
  // Redirect to the main app entry point
  return <Redirect href="/welcome" />;
}