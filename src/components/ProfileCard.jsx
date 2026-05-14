import { Mail, MapPin, Pencil, Phone, School } from 'lucide-react';

export function ProfileCard({ user, completion, onEdit }) {
  return (
    <section className="profile-card">
      <div className="profile-cover" />
      <div className="profile-card-body">
        <img className="profile-avatar" src={user.avatar} alt={`${user.name} avatar`} />
        <div className="profile-title">
          <span className="eyebrow">Student account</span>
          <h1>{user.name}</h1>
          <p>{user.studentId} / Joined {user.joinedDate}</p>
        </div>
        <button className="secondary" onClick={onEdit}>
          <Pencil size={17} />
          Edit profile
        </button>
      </div>

      <div className="profile-info-grid">
        <InfoItem icon={Mail} label="Email" value={user.email} />
        <InfoItem icon={Phone} label="Phone" value={user.phone || 'Add phone number'} />
        <InfoItem icon={School} label="College" value={user.college || 'Add college name'} />
        <InfoItem icon={MapPin} label="Location" value={user.location || 'Add location'} />
      </div>

      <div className="completion-box">
        <div>
          <strong>Profile completion</strong>
          <span>{completion}% complete</span>
        </div>
        <div className="progress-track">
          <span style={{ width: `${completion}%` }} />
        </div>
        {completion < 100 && <p>Complete your profile</p>}
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="profile-info-item">
      <Icon size={18} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
