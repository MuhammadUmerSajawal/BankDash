import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { HiOutlineChevronDown, HiOutlinePencilSquare } from "react-icons/hi2";
import "../styles/settings.css";

const tabs = [
  { key: "profile", label: "Edit Profile" },
  { key: "preferences", label: "Preferences" },
  { key: "security", label: "Security" },
];

function Toggle({ checked }) {
  return <span className={`settings-toggle${checked ? " is-active" : ""}`} aria-hidden="true" />;
}

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    birthDate: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [preferencesForm, setPreferencesForm] = useState({
    currency: "",
    timezone: "",
    digitalCurrency: true,
    merchantOrder: false,
    recommendation: true,
  });
  const [securityForm, setSecurityForm] = useState({
    twoFactor: true,
    currentPassword: "",
    newPassword: "",
  });
  const [saveMessage, setSaveMessage] = useState("");

  const handleProfileSave = (event) => {
    event.preventDefault();
    setSaveMessage("Profile settings saved successfully.");
  };

  const handlePreferencesSave = (event) => {
    event.preventDefault();
    setSaveMessage("Preferences updated successfully.");
  };

  const handleSecuritySave = (event) => {
    event.preventDefault();
    setSaveMessage("Security settings updated successfully.");
  };

  return (
    <Container fluid className="settings-page">
      <Card className="dashboard-panel border-0 shadow-sm settings-card motion-section motion-delay-1">
        <div className="settings-tabs" role="tablist" aria-label="Settings sections">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`settings-tabs__button${activeTab === tab.key ? " is-active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" ? (
          <div className="settings-panel">
            <Row className="g-4">
              <Col lg={2} className="settings-profile-col">
                <div className="settings-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Charlene Reed"
                  />
                  <button type="button" className="settings-avatar__edit">
                    <HiOutlinePencilSquare size={12} />
                  </button>
                </div>
              </Col>

              <Col lg={10}>
                <Form onSubmit={handleProfileSave}>
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Your Name</Form.Label>
                        <Form.Control className="settings-field" placeholder="Charlene Reed" value={profileForm.name} onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">User Name</Form.Label>
                        <Form.Control className="settings-field" placeholder="Charlene Reed" value={profileForm.username} onChange={(event) => setProfileForm((current) => ({ ...current, username: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Email</Form.Label>
                        <Form.Control className="settings-field" placeholder="charlenereed@gmail.com" value={profileForm.email} onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Password</Form.Label>
                        <Form.Control className="settings-field" type="password" placeholder="**********" value={profileForm.password} onChange={(event) => setProfileForm((current) => ({ ...current, password: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Date of Birth</Form.Label>
                        <div className="settings-select-wrap">
                          <Form.Control className="settings-field pe-5" placeholder="25 January 1990" value={profileForm.birthDate} onChange={(event) => setProfileForm((current) => ({ ...current, birthDate: event.target.value }))} />
                          <HiOutlineChevronDown className="settings-select-wrap__icon" />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Present Address</Form.Label>
                        <Form.Control className="settings-field" placeholder="San Jose, California, USA" value={profileForm.presentAddress} onChange={(event) => setProfileForm((current) => ({ ...current, presentAddress: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Permanent Address</Form.Label>
                        <Form.Control className="settings-field" placeholder="San Jose, California, USA" value={profileForm.permanentAddress} onChange={(event) => setProfileForm((current) => ({ ...current, permanentAddress: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">City</Form.Label>
                        <Form.Control className="settings-field" placeholder="San Jose" value={profileForm.city} onChange={(event) => setProfileForm((current) => ({ ...current, city: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Postal Code</Form.Label>
                        <Form.Control className="settings-field" placeholder="45962" value={profileForm.postalCode} onChange={(event) => setProfileForm((current) => ({ ...current, postalCode: event.target.value }))} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-semibold">Country</Form.Label>
                        <Form.Control className="settings-field" placeholder="USA" value={profileForm.country} onChange={(event) => setProfileForm((current) => ({ ...current, country: event.target.value }))} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="settings-actions">
                    <Button type="submit" className="settings-save-btn">Save</Button>
                  </div>
                  {saveMessage && activeTab === "profile" ? <div className="page-feedback page-feedback--success">{saveMessage}</div> : null}
                </Form>
              </Col>
            </Row>
          </div>
        ) : null}

        {activeTab === "preferences" ? (
          <div className="settings-panel">
            <Form onSubmit={handlePreferencesSave}>
              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Currency</Form.Label>
                    <Form.Control className="settings-field" placeholder="USD" value={preferencesForm.currency} onChange={(event) => setPreferencesForm((current) => ({ ...current, currency: event.target.value }))} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Time Zone</Form.Label>
                    <Form.Control className="settings-field" placeholder="(GMT-12:00) International Date Line West" value={preferencesForm.timezone} onChange={(event) => setPreferencesForm((current) => ({ ...current, timezone: event.target.value }))} />
                  </Form.Group>
                </Col>
              </Row>

              <div className="settings-section-title">Notification</div>
              <div className="settings-toggle-list">
                <button type="button" className="settings-toggle-row settings-toggle-row--button border-0 bg-transparent" onClick={() => setPreferencesForm((current) => ({ ...current, digitalCurrency: !current.digitalCurrency }))}>
                  <Toggle checked={preferencesForm.digitalCurrency} />
                  <span>I send or receive digita currency</span>
                </button>
                <button type="button" className="settings-toggle-row settings-toggle-row--button border-0 bg-transparent" onClick={() => setPreferencesForm((current) => ({ ...current, merchantOrder: !current.merchantOrder }))}>
                  <Toggle checked={preferencesForm.merchantOrder} />
                  <span>I receive merchant order</span>
                </button>
                <button type="button" className="settings-toggle-row settings-toggle-row--button border-0 bg-transparent" onClick={() => setPreferencesForm((current) => ({ ...current, recommendation: !current.recommendation }))}>
                  <Toggle checked={preferencesForm.recommendation} />
                  <span>There are recommendation for my account</span>
                </button>
              </div>

              <div className="settings-actions">
                <Button type="submit" className="settings-save-btn">Save</Button>
              </div>
              {saveMessage && activeTab === "preferences" ? <div className="page-feedback page-feedback--success">{saveMessage}</div> : null}
            </Form>
          </div>
        ) : null}

        {activeTab === "security" ? (
          <div className="settings-panel settings-panel--narrow">
            <Form onSubmit={handleSecuritySave}>
              <div className="settings-section-title">Two-factor Authentication</div>
              <button type="button" className="settings-toggle-row settings-toggle-row--button border-0 bg-transparent mb-4" onClick={() => setSecurityForm((current) => ({ ...current, twoFactor: !current.twoFactor }))}>
                <Toggle checked={securityForm.twoFactor} />
                <span>Enable or disable two factor authentication</span>
              </button>

              <div className="settings-section-title">Change Password</div>
              <Row className="g-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Current Password</Form.Label>
                    <Form.Control className="settings-field" type="password" placeholder="**********" value={securityForm.currentPassword} onChange={(event) => setSecurityForm((current) => ({ ...current, currentPassword: event.target.value }))} />
                  </Form.Group>
                </Col>
                <Col md={6}></Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">New Password</Form.Label>
                    <Form.Control className="settings-field" type="password" placeholder="**********" value={securityForm.newPassword} onChange={(event) => setSecurityForm((current) => ({ ...current, newPassword: event.target.value }))} />
                  </Form.Group>
                </Col>
              </Row>

              <div className="settings-actions">
                <Button type="submit" className="settings-save-btn">Save</Button>
              </div>
              {saveMessage && activeTab === "security" ? <div className="page-feedback page-feedback--success">{saveMessage}</div> : null}
            </Form>
          </div>
        ) : null}
      </Card>
    </Container>
  );
}

export default SettingsPage;
