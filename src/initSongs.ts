import { Category } from "./database/models/category-model";
import { Song } from "./database/models/song-model";
import { User } from "./database/models/user-model";
import { Playlist } from "./database/models/playlist-model"; // Import Playlist model

export async function initSongs() {
  const user = await User.findOne({ email: "Arad.ariel22@test.com" });

  if (!user) {
    // populate the db here
    const adminUser = await User.create({
      name: "Arad",
      email: "Arad.ariel22@test.com",
      password: "$2b$12$9VLT5AjsoWaGmTNKbgF55..zfZxABIZDn6HGOP4LokYDCUS5Fm1KO",
      gender: "male",
      month: "January",
      date: "15",
      year: "1990",
      likedSongs: [],
      playlists: [],
      isAdmin: true,
      __v: 0,
    });

    // create music for some category
    const israeliMusic = [];
    const TranceMusic = [];

    israeliMusic.push(
      new Song({
        originalname: `מוקי - ילד של אבא.mp3`,
        destination: "public/uploads/songs/",
        path: `public/uploads/songs/מוקי - ילד של אבא.mp3`,
        size: 83063462,
        userId: adminUser._id,
      })
    );
    TranceMusic.push(
      new Song({
        originalname: `09 Digital Sun - Virtual Journey.mp3`,
        destination: "public/uploads/songs/",
        path: `public/uploads/songs/09 Digital Sun - Virtual Journey.mp3`,
        size: 11111,
        userId: adminUser._id,
      })
    );

    // save all the songs and get an id array of new music
    const created_israeli = await Song.bulkSave(israeliMusic);
    const created_trance = await Song.bulkSave(TranceMusic);

    // create a category for the created music,
    // the category has a relationship with those songs
    const category = await Category.create({
      name: "israeliMusic",
      tagline: "..",
      songs: Object.values(created_israeli.insertedIds),
    });
    const categoryTrance = await Category.create({
      name: "TranceMusic",
      tagline: "..",
      songs: Object.values(created_trance.insertedIds),
    });

    // create a playlist with relationship to songs
    const playlistImage =
      "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const playlistImage2 =
      "https://as1.ftcdn.net/v2/jpg/05/52/46/10/1000_F_552461055_DKlQAqxsTfohmMZC3Suz0xKzD8GMuuAy.jpg";
    const playlist = await Playlist.create({
      name: "My Playlist",
      desc: "My favorite songs",
      img: playlistImage,
      songs: Object.values(created_israeli.insertedIds),
      userId: adminUser._id,
      category_id: category._id,
    });
    const playlist2 = await Playlist.create({
      name: "My TranceInitPlaylist",
      desc: "My Trance songs",
      img: playlistImage2,
      songs: Object.values(created_trance.insertedIds),
      userId: adminUser._id,
      category_id: categoryTrance._id,
    });

    // Add playlist to user's playlist array
    adminUser.playlists.push(playlist._id);
    await adminUser.save();
  }

  // when fetching a category
  // populate it with the song array
  // orelse it comes without the actual songs inside
  const category = await Category.findOne({ name: "heart" }).populate("songs");
  console.log(category);
}
