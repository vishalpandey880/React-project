import { CalendarDays, Mail, MapPin, Phone, School } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';

export function ProfileHeader({ user, completion, onEdit }) {
  const initials = user.name?.slice(0, 2).toUpperCase() || 'DB';

  return (
    <Card className="sh-profile-header">
      <div className="sh-profile-cover" />
      <CardContent className="sh-profile-header-content">
        <div className="sh-profile-main">
          <Avatar className="sh-profile-avatar">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="sh-profile-title-row">
              <h1>{user.name}</h1>
              <div className="sh-badge-row">
                <Badge>Student</Badge>
                <Badge variant="secondary">Verified Demo User</Badge>
                <Badge variant="outline">Book Seller</Badge>
              </div>
            </div>
            <p>{user.bio || 'Student reader managing books, orders, notes, reviews, and campus listings.'}</p>
          </div>
          <Button onClick={onEdit}>Edit Profile</Button>
        </div>

        <div className="sh-profile-details">
          <Info icon={Mail} label="Email" value={user.email} />
          <Info icon={School} label="College" value={user.college || 'College not added'} />
          <Info icon={Phone} label="Phone" value={user.phone || 'Phone not added'} />
          <Info icon={MapPin} label="Location" value={user.location || 'Location not added'} />
          <Info icon={CalendarDays} label="Joined" value={user.joinedDate} />
          <Info icon={School} label="Student ID" value={user.studentId} />
        </div>

        <div className="sh-completion">
          <div>
            <strong>Profile completion</strong>
            <span>{completion}%</span>
          </div>
          <Progress value={completion} />
        </div>
      </CardContent>
    </Card>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="sh-info">
      <Icon size={17} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
