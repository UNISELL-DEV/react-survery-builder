"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SurveyBuilderProvider } from "@/packages/survey-form-package/src/context/SurveyBuilderContext";
import { ThemeBuilder } from "@/packages/survey-form-package/src/builder/survey/panels/ThemeBuilder";
import { sampleSurvey } from "@/app/surveydata";
import { Button } from "@/packages/survey-form-package/src/components/ui/button";
import { Input } from "@/packages/survey-form-package/src/components/ui/input";
import { Label } from "@/packages/survey-form-package/src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/packages/survey-form-package/src/components/ui/dialog";
import { Download, Upload, Info, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import type { ThemeDefinition, NodeData, LocalizationMap } from "@/packages/survey-form-package/src/types";

// LocalStorage key
const STORAGE_KEY = 'survey_custom_themes';

// Saved theme interface
interface SavedTheme {
  id: string;
  name: string;
  theme: ThemeDefinition;
  createdAt: string;
  updatedAt: string;
}

// LocalStorage utilities
const getSavedThemes = (): SavedTheme[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const themes = JSON.parse(stored);
    return Array.isArray(themes) ? themes : [];
  } catch (error) {
    console.error('Error loading saved themes:', error);
    return [];
  }
};

const saveThemeToStorage = (name: string, theme: ThemeDefinition): SavedTheme => {
  const themes = getSavedThemes();

  const now = new Date().toISOString();
  const id = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  const savedTheme: SavedTheme = {
    id,
    name,
    theme: {
      ...theme,
      name: 'custom' // Ensure custom theme type
    },
    createdAt: now,
    updatedAt: now,
  };

  // Add new theme
  themes.push(savedTheme);

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));

  return savedTheme;
};

const deleteThemeFromStorage = (id: string): boolean => {
  const themes = getSavedThemes();
  const filtered = themes.filter(t => t.id !== id);

  if (filtered.length === themes.length) {
    return false; // Theme not found
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

export default function ThemeBuilderDemoPage() {
  const [currentTheme, setCurrentTheme] = useState<ThemeDefinition | null>(null);
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [themeName, setThemeName] = useState("");
  const [saveError, setSaveError] = useState("");

  // Load saved themes on mount
  useEffect(() => {
    setSavedThemes(getSavedThemes());
  }, []);

  // Handle theme changes from ThemeBuilder
  const handleDataChange = useCallback((data: { rootNode: NodeData | null; localizations: LocalizationMap; theme?: ThemeDefinition }) => {
    if (data.theme) {
      setCurrentTheme(data.theme);
    }
  }, []);

  // Handle save theme
  const handleSaveTheme = () => {
    if (!currentTheme) return;

    if (!themeName.trim()) {
      setSaveError("Please enter a theme name");
      return;
    }

    // Check if name already exists
    if (savedThemes.some(t => t.name.toLowerCase() === themeName.toLowerCase())) {
      setSaveError("A theme with this name already exists");
      return;
    }

    // Save theme
    const savedTheme = saveThemeToStorage(themeName, currentTheme);
    setSavedThemes([...savedThemes, savedTheme]);
    setShowSaveDialog(false);
    setThemeName("");
    setSaveError("");
  };

  // Handle delete theme
  const handleDeleteTheme = (id: string) => {
    if (deleteThemeFromStorage(id)) {
      setSavedThemes(savedThemes.filter(t => t.id !== id));
    }
  };

  // Handle export theme
  const handleExportTheme = (theme: ThemeDefinition, name: string) => {
    const dataStr = JSON.stringify(theme, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}-theme.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Theme Builder Studio
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Create, customize, and export survey themes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowSaveDialog(true)}
                disabled={!currentTheme}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Theme
              </Button>
              <Link href="/builder">
                <Button variant="outline" size="sm">
                  Survey Builder
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="sm">
                  Survey Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">
                Standalone Theme Builder
              </h3>
              <p className="text-sm text-blue-800 mt-1">
                Design and customize survey themes independently. Save your theme with a custom name to localStorage, or export as JSON.
                Saved themes will appear in the preset selection for easy reuse.
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <Save className="w-4 h-4" />
                  <span>Save themes to localStorage</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Export as JSON files</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <Upload className="w-4 h-4" />
                  <span>Import saved themes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Themes Panel */}
      {savedThemes.length > 0 && (
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Saved Custom Themes ({savedThemes.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {savedThemes.map((saved) => (
                <div
                  key={saved.id}
                  className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-gray-900 truncate flex-1">
                      {saved.name}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTheme(saved.id)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex gap-1 mb-2">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: saved.theme.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: saved.theme.colors.secondary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: saved.theme.colors.accent }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportTheme(saved.theme, saved.name)}
                    className="w-full flex items-center justify-center gap-1 h-7 text-xs"
                  >
                    <Download className="w-3 h-3" />
                    Export
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full">
        <SurveyBuilderProvider
          initialData={{
            rootNode: sampleSurvey.rootNode,
            localizations: sampleSurvey.localizations,
            theme: sampleSurvey.theme as ThemeDefinition,
          }}
        >
          <ThemeBuilder
            onDataChange={handleDataChange}
            customThemes={Object.fromEntries(
              savedThemes.map(saved => [saved.name, saved.theme])
            )}
          />
        </SurveyBuilderProvider>
      </div>

      {/* Save Theme Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Custom Theme</DialogTitle>
            <DialogDescription>
              Give your theme a name to save it for later use. It will appear in the preset selection.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="theme-name">Theme Name</Label>
              <Input
                id="theme-name"
                placeholder="e.g., My Custom Theme"
                value={themeName}
                onChange={(e) => {
                  setThemeName(e.target.value);
                  setSaveError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveTheme();
                  }
                }}
              />
              {saveError && (
                <p className="text-sm text-red-600">{saveError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowSaveDialog(false);
                setThemeName("");
                setSaveError("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTheme}>
              Save Theme
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
