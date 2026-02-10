-- Run this after you already created public.restaurants. It seeds data and adds FKs to swipes/matches.

-- 1. Seed restaurants (from frontend/src/data/restaurants.json)
insert into public.restaurants (id, name, description, cuisine, price_range, image_url, location, rating, lat, lng) values
(2, 'Project 72 Wine & Deli', 'Mediterranean cuisine with an extensive wine list in an elegant atmosphere.', 'Mediterranean', '$$$', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', 'Đure Daničića 25', 4.8, 45.2545, 19.8453),
(18, 'La Terrazza', 'Rooftop restaurant with panoramic city views and Mediterranean menu.', 'Mediterranean', '$$$', 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800', 'Bulevar Mihajla Pupina 10', 4.8, 45.2593, 19.8293),
(1, 'Fish & Zelenish', 'Upscale restaurant known for fresh fish and creative vegetable dishes in a modern setting.', 'Seafood', '$$$', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', 'Zmaj Jovina 8', 4.7, 45.2553, 19.8439),
(8, 'Kafeterija Konditorei', 'Elegant patisserie with Viennese-style cakes and pastries.', 'Desserts', '$', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800', 'Zmaj Jovina 11', 4.7, 45.2556, 19.8438),
(15, 'Gatto Nero', 'Romantic Italian restaurant with candlelit ambiance and fine wines.', 'Italian', '$$$', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', 'Dunavska 32', 4.7, 45.2581, 19.8473),
(4, 'Loki Caffe & Restaurant', 'Trendy spot offering international cuisine and excellent cocktails.', 'International', '$$', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Laze Telečkog 5', 4.6, 45.2565, 19.8425),
(7, 'Lazin Salaš', 'Traditional Serbian restaurant on a countryside farm with live music.', 'Serbian', '$$', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', 'Ribarsko ostrvo', 4.6, 45.2389, 19.8511),
(13, 'Trattoria Campania', 'Family-run Italian restaurant with homemade pasta and warm hospitality.', 'Italian', '$$', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', 'Futoška 14', 4.6, 45.2534, 19.8412),
(22, 'Steakhouse Texas', 'Premium steaks and grilled meats in a Western-themed setting.', 'Steakhouse', '$$$', 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800', 'Bulevar Evrope 18', 4.6, 45.2618, 19.8301),
(25, 'Pasta Fresca', 'Fresh homemade pasta daily with seasonal Italian ingredients.', 'Italian', '$$', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', 'Zmaj Jovina 5', 4.6, 45.2559, 19.8441),
(3, 'Plava Frajla', 'Traditional Serbian cuisine in the heart of the old town with outdoor seating.', 'Serbian', '$$', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', 'Zmaj Jovina 14', 4.5, 45.2558, 19.8436),
(6, 'Pizzeria Buongiorno', 'Authentic Italian pizza with thin crust and fresh ingredients.', 'Italian', '$$', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', 'Bulevar Oslobođenja 24', 4.5, 45.2612, 19.8315),
(12, 'Burger Bar', 'Gourmet burgers with creative toppings and hand-cut fries.', 'Burger', '$$', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', 'Bulevar Evrope 22', 4.5, 45.2623, 19.8298),
(20, 'Maharaja', 'Traditional Indian restaurant with flavorful curries and tandoori specialties.', 'Indian', '$$', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', 'Bulevar Oslobođenja 67', 4.5, 45.2589, 19.8345),
(23, 'Veggie Garden', 'Plant-based restaurant with creative vegetarian and vegan dishes.', 'Vegetarian', '$$', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 'Narodnih heroja 14', 4.5, 45.2567, 19.8423),
(5, 'Inkafe', 'Cozy cafe with great breakfast options and homemade cakes.', 'Cafe', '$', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800', 'Laze Kostića 7', 4.4, 45.2547, 19.8447),
(11, 'Sushi Time', 'Modern Japanese restaurant with fresh sushi and ramen bowls.', 'Japanese', '$$', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800', 'Bulevar Oslobođenja 97', 4.4, 45.2587, 19.8356),
(14, 'Dva Jelena', 'Historic restaurant serving traditional Serbian dishes since 1890.', 'Serbian', '$$', 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800', 'Dunavska 27', 4.4, 45.2576, 19.8469),
(21, 'Promenada', 'Riverside restaurant with stunning Danube views and international cuisine.', 'International', '$$', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Kej žrtava racije 15', 4.4, 45.2552, 19.8498),
(24, 'Ćevabdžinica Žar', 'Local favorite for traditional ćevapi and grilled meats.', 'Balkan', '$', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800', 'Bulevar Oslobođenja 112', 4.4, 45.2612, 19.8378),
(9, 'Restoran Fontana', 'Waterfront dining with a mix of Serbian and international dishes.', 'International', '$$', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800', 'Kej žrtava racije', 4.3, 45.2548, 19.8502),
(16, 'Toster Bar', 'Creative sandwiches and toasts with craft beer selection.', 'Sandwiches', '$', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800', 'Dunavska 22', 4.3, 45.2572, 19.8465),
(19, 'Taco Amigo', 'Casual Mexican eatery with authentic tacos and burritos.', 'Mexican', '$', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800', 'Bulevar Oslobođenja 45', 4.3, 45.2598, 19.8334),
(10, 'Chicken House', 'Casual spot specializing in grilled chicken and fast food.', 'Fast Food', '$', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800', 'Bulevar Mihajla Pupina 12', 4.2, 45.2598, 19.8287),
(17, 'China Garden', 'Authentic Chinese cuisine with dim sum and traditional dishes.', 'Chinese', '$$', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800', 'Bulevar cara Lazara 86', 4.2, 45.2456, 19.8367)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  cuisine = excluded.cuisine,
  price_range = excluded.price_range,
  image_url = excluded.image_url,
  location = excluded.location,
  rating = excluded.rating,
  lat = excluded.lat,
  lng = excluded.lng;

-- 2. Add foreign keys (skips if constraints already exist)
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'fk_swipes_restaurant') then
    alter table public.swipes
      add constraint fk_swipes_restaurant
      foreign key (restaurant_id) references public.restaurants(id) on delete restrict;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'fk_matches_restaurant') then
    alter table public.matches
      add constraint fk_matches_restaurant
      foreign key (restaurant_id) references public.restaurants(id) on delete restrict;
  end if;
end $$;
