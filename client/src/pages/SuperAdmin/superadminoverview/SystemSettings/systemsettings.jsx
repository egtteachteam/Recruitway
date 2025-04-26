import React, { useState, useEffect } from "react";

const SystemSettings = () => {
  const [emailTemplates, setEmailTemplates] = useState({
    interviewInvite: "",
    statusUpdate: "",
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [resumeLimits, setResumeLimits] = useState({ size: 5, types: "pdf, docx" });
  const [apiKeys, setApiKeys] = useState({ cloudinary: "", other: "" });

  useEffect(() => {
    // Replace with actual GET API call to fetch settings
    console.log("Fetching settings...");
  }, []);

  const handleSaveSettings = () => {
    // Replace with actual POST or PUT API call
    console.log("Saving settings...", {
      emailTemplates,
      notificationsEnabled,
      resumeLimits,
      apiKeys,
    });
  };

  return (
    <div className="p-6 space-y-8">
      {/* Email Templates */}
      <section className="bg-white shadow rounded p-4 mt-5">
        <h2 className="text-lg font-semibold mb-4">Email Templates</h2>
        <div className="space-y-3">
          <div>
            <label className="block font-medium">Interview Invite</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={emailTemplates.interviewInvite}
              onChange={(e) =>
                setEmailTemplates({ ...emailTemplates, interviewInvite: e.target.value })
              }
              placeholder="Dear [Candidate], you are invited to..."
            />
          </div>
          <div>
            <label className="block font-medium">Status Update</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              value={emailTemplates.statusUpdate}
              onChange={(e) =>
                setEmailTemplates({ ...emailTemplates, statusUpdate: e.target.value })
              }
              placeholder="Your application status is now..."
            />
          </div>
        </div>
      </section>

      {/* Notification Rules */}
      <section className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Notification Rules</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
          Enable system notifications (email + in-app)
        </label>
      </section>

      {/* Resume Limits */}
      <section className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Resume Upload Settings</h2>
        <div className="space-y-3">
          <div>
            <label className="block font-medium">Max File Size (MB)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={resumeLimits.size}
              onChange={(e) => setResumeLimits({ ...resumeLimits, size: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block font-medium">Allowed File Types</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={resumeLimits.types}
              onChange={(e) => setResumeLimits({ ...resumeLimits, types: e.target.value })}
              placeholder="pdf, docx"
            />
          </div>
        </div>
      </section>

      {/* API Keys */}
      <section className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">API Keys</h2>
        <div className="space-y-3">
          <div>
            <label className="block font-medium">Cloudinary API Key</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={apiKeys.cloudinary}
              onChange={(e) => setApiKeys({ ...apiKeys, cloudinary: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium">Other API Key</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={apiKeys.other}
              onChange={(e) => setApiKeys({ ...apiKeys, other: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 px-6 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
