import { Activity, BookHeart, PackageCheck, Star, Store, UserCog } from 'lucide-react';
import { Reveal } from '../reactbits/Reveal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ProfileOrders } from './ProfileOrders';
import { ProfileReviews } from './ProfileReviews';
import { ProfileSelling } from './ProfileSelling';
import { ProfileSettings } from './ProfileSettings';
import { ProfileWishlist } from './ProfileWishlist';

const tabs = [
  ['overview', 'Overview', Activity],
  ['orders', 'Orders', PackageCheck],
  ['wishlist', 'Wishlist', BookHeart],
  ['selling', 'Selling', Store],
  ['reviews', 'Reviews', Star],
  ['settings', 'Settings', UserCog],
];

export function ProfileTabs({
  activeTab,
  setActiveTab,
  orders,
  wishlist,
  sellingBooks,
  reviews,
  theme,
  setTheme,
  changePassword,
  onLogout,
  onMoveToCart,
  onRemoveWishlist,
  onDeleteBook,
}) {
  return (
    <Reveal>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="sh-profile-tabs">
      {({ value, onValueChange }) => (
        <>
          <TabsList>
            {tabs.map(([id, label, Icon]) => (
              <TabsTrigger key={id} value={id} activeValue={value} onValueChange={onValueChange}>
                <Icon size={16} />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" activeValue={value}>
            <div className="sh-overview-grid">
              <ProfileOrders orders={orders} preview />
              <ProfileWishlist wishlist={wishlist} preview />
              <ProfileSelling books={sellingBooks} preview />
              <Card>
                <CardHeader>
                  <CardTitle>Account Activity</CardTitle>
                  <CardDescription>Quick student dashboard signals.</CardDescription>
                </CardHeader>
                <CardContent className="sh-activity-grid">
                  <div><strong>{orders.length}</strong><span>Orders placed</span></div>
                  <div><strong>{wishlist.length}</strong><span>Saved books</span></div>
                  <div><strong>{sellingBooks.length}</strong><span>Books listed</span></div>
                  <div><strong>{reviews.length}</strong><span>Reviews written</span></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" activeValue={value}>
            <ProfileOrders orders={orders} />
          </TabsContent>

          <TabsContent value="wishlist" activeValue={value}>
            <ProfileWishlist wishlist={wishlist} onMoveToCart={onMoveToCart} onRemove={onRemoveWishlist} />
          </TabsContent>

          <TabsContent value="selling" activeValue={value}>
            <ProfileSelling books={sellingBooks} onDelete={onDeleteBook} />
          </TabsContent>

          <TabsContent value="reviews" activeValue={value}>
            <ProfileReviews reviews={reviews} />
          </TabsContent>

          <TabsContent value="settings" activeValue={value}>
            <ProfileSettings theme={theme} setTheme={setTheme} changePassword={changePassword} onLogout={onLogout} />
          </TabsContent>
        </>
      )}
      </Tabs>
    </Reveal>
  );
}
