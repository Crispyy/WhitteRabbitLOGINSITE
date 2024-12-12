import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { settingsService } from '../services/settings/settingsService';

export function useSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadSettings = async () => {
      try {
        setLoading(true);
        const userSettings = await settingsService.getUserSettings(user.uid);
        setSettings(userSettings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  const updateSettings = async (newSettings) => {
    try {
      setLoading(true);
      const updatedSettings = await settingsService.updateSettings(user.uid, newSettings);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { settings, updateSettings, loading, error };
}