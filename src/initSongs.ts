import { Category } from "./database/models/category-model";
import { Song } from "./database/models/song-model";
import { User } from "./database/models/user-model";
import { Playlist } from "./database/models/playlist-model"; // Import Playlist model
//This is the Init Of The DataBase !!!///

const calculateSongDuration = (size, bitrate) =>
  ((size * 8) / (bitrate * 1000 * 60)).toFixed(2);
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
    const PopMusic = [];
    const bitrate = 320;
    israeliMusic.push(
      new Song({
        originalname: `מוקי - ילד של אבא.mp3`,
        destination: "public/uploads/songs/",
        path: `public/uploads/songs/מוקי - ילד של אבא.mp3`,
        size: 9808222,
        userId: adminUser._id,
        bitrate,
        duration: calculateSongDuration(9808222, bitrate),
      })
    );
    TranceMusic.push(
      new Song({
        originalname: `09 Digital Sun - Virtual Journey.mp3`,
        destination: "public/uploads/songs/",
        path: `public/uploads/songs/09 Digital Sun - Virtual Journey.mp3`,
        size: 23372926,
        userId: adminUser._id,
        bitrate,
        duration: calculateSongDuration(23372926, bitrate),
      })
    );
    PopMusic.push(
      new Song({
        originalname: `Lana Del Rey - Young & Beauriful (Single) - 01 - Young And Beautiful`,
        destination: "public/uploads/songs/",
        path: `public/uploads/songs/Lana Del Rey - Young & Beauriful (Single) - 01 - Young And Beautiful.mp3`,
        size: 9449572,
        userId: adminUser._id,
        bitrate,
        duration: calculateSongDuration(9449572, bitrate),
      })
    );

    // save all the songs and get an id array of new music
    const created_israeli = await Song.bulkSave(israeliMusic);
    const created_trance = await Song.bulkSave(TranceMusic);
    const created_pop = await Song.bulkSave(PopMusic);

    // create a category for the created music,
    // the category has a relationship with those songs
    const categoryIsraeli = await Category.create({
      name: "israeliMusic",
      tagline: "..",
      songs: Object.values(created_israeli.insertedIds),
    });
    const categoryTrance = await Category.create({
      name: "TranceMusic",
      tagline: "..",
      songs: Object.values(created_trance.insertedIds),
    });

    const categoryPop = await Category.create({
      name: "PopMusic",
      tagline: "..",
      songs: Object.values(created_pop.insertedIds),
    });

    // create a playlist with relationship to songs
    const playlistImage =
      "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const playlistImage2 =
      "https://as1.ftcdn.net/v2/jpg/05/52/46/10/1000_F_552461055_DKlQAqxsTfohmMZC3Suz0xKzD8GMuuAy.jpg";

    const playlistImage3 =
      "https://images.unsplash.com/photo-1593532847221-003b37578812?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const playlist = await Playlist.create({
      name: "IsraeliMusic",
      desc: "My favorite songs",
      img: playlistImage,
      songs: Object.values(created_israeli.insertedIds),
      userId: adminUser._id,
      category_id: categoryIsraeli._id,
    });
    const playlist2 = await Playlist.create({
      name: "My TranceInitPlaylist",
      desc: "My Trance songs",
      img: playlistImage2,
      songs: Object.values(created_trance.insertedIds),
      userId: adminUser._id,
      category_id: categoryTrance._id,
    });
    const playlist3 = await Playlist.create({
      name: "My PopPlaylist",
      desc: "My Pop songs",
      img: playlistImage3,
      songs: Object.values(created_pop.insertedIds),
      userId: adminUser._id,
      category_id: categoryPop._id,
    });

    // Add playlist to user's playlist array
    adminUser.playlists.push(playlist._id);
    await adminUser.save();
  }

  // when fetching a category
  // populate it with the song array
  // orelse it comes without the actual songs inside
  const category = await Category.findOne({ name: "israeli" }).populate(
    "songs"
  );
  console.log(category);
}
