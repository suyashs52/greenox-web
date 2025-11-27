import { Link, Outlet } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import BlogBanner from "./BlogBanner";

const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const latestStories = [
  {
    slug: "whole-grains-1",
    title: "Try these healthy hot Indian breakfasts",
    img: "/blog/proteensalad.jpg",
    author: "By Kinjalika",
    date: "2025 NOV 18",
    desc: "Breakfast is the most important meal of the day. But wolfing down a plate of aloo puri or buttered toast, standard morning fare in many homes, will do you more harm than good. If you",
    full: "Try these healthy hot Indian breakfasts",
    avatar: "/blog/Kinjalika.jpg",
  },
  {
    slug: "whole-grains-2",
    title: "Chicken Caesar Salad Recipe Healthy Recipes",
    img: "/blog/proteensalad2.jpg",
    author: "By GreeNox Diet",
    date: "2023 NOV 18",
    desc: "Breakfast is the most important meal of the day. But wolfing down a plate of aloo puri or buttered toast, standard morning fare in many homes, will do you more harm than good. If you",
    full: "Full article content for story 2...",
    avatar: "/blog/Aditya.jpg",
  },
  {
    slug: "whole-grains-3",
    title: "All About Whole Grains... 3",
    img: "/blog/proteensalad3.jpg",
    author: "By GreeNox Diet",
    date: "2023 NOV 18",
    desc: "Everyone wants a job that offers flexibility, allows creativity, requires...",
    full: "Full article content for story 3...",
    avatar: "/blog/Adeesh.jpg",
  },
];

export const topReads = [
  {
    title: "Height Weight Chart – Ideal Weight for Men and Women",
    desc: "Good health is a prerequisite for happiness. While for adults, a vital for children and quality of life, for children, is essential for proper growth, both physically and mentally.",
    img: "/blog/height.jpg",
    tag: "Weight Loss",
    author: "Dr A Bhowal",
    avatar: "/blog/Akash.jpg",
  },
  {
    title: "The Ultimate 7-Day Meal Plan for Intermittent Fasting",
    desc: "Intermittent fasting has gained significant prominence as a powerful method for weight loss and overall health improvement.",
    img: "/blog/ultimate.jpg",
    tag: "Diet Plans",
    author: "Riya Malampy",
    avatar: "/blog/Akash.jpg",
  },
  {
    title: "Introduction to Smart Scale",
    desc: "We live in a world that evaluates efficiency, efficacy, and accessibility. Yet a lot of this we somehow forget that health is the greatest virtue.",
    img: "/blog/weightloss.jpg",
    tag: "Weight Loss",
    author: "By Neha",
    avatar: "/blog/Akash.jpg",
  },
];

export const recentPosts = [
  {
    slug: "whole-grains-3",
    title: "All About Whole Grains... 3",
    img: "/blog/proteensalad3.jpg",
    author: "By GreeNox Diet",
    date: "2023 NOV 18",
    desc: "Everyone wants a job that offers flexibility, allows creativity, requires...",
    full: "Full article content for story 3...",
    avatar: "/blog/Adeesh.jpg",
  },
  {
    title: "Alfredo ( White Sauce ) Pasta",
    img: "/blog/proteensalad.jpg",
    avatar: "/blog/Akash.jpg",
    full: "BC Red Nutritional Juice for Weight Loss",
  },
  {
    title: "Apple Berry Oatmeal Jar",
    img: "/blog/proteensalad3.jpg",
    author: "By GreeNox Transformation",
    avatar: "/blog/Akash.jpg",
  },
  {
    title: "Apple Berry Oatmeal Jar",
    img: "/blog/proteensalad.jpg",
    author: "By Savansana “Shiva” Hantare",
    avatar: "/blog/Akash.jpg",
  },
  {
    title: "Assorted Veggies & Quinoa Salad !",
    img: "/blog/proteensalad2.jpg",
    author: "By GreeNox Diet",
    avatar: "/blog/Akash.jpg",
  },
  {
    title: "Assorted Veggies & Quinoa Salad",
    img: "/blog/proteensalad3.jpg",
    author: "By GreeNox Diet",
    avatar: "/blog/Akash.jpg",
  },
  {
    title: "Avocado & Berries Smoothie Bowl ",
    img: "/blog/proteensalad3.jpg",
    author: "By Riya Malampy",
    avatar: "/blog/Akash.jpg",
  },
  {
    title: "Hara Bhara Kebab Wrap",
    img: "/blog/proteensalad2.jpg",
    author: "By Nandita Thombre",
    avatar: "/blog/Akash.jpg",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Hero Banner */}
      <BlogBanner />

      {/* Search Section */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base shadow focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Latest Stories Section */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <h2 className="mb-4 text-xl font-semibold">Latest Stories</h2>

        <div className="flex gap-6 overflow-x-auto pb-2">
          {latestStories.map((story) => (
            <Link
              key={story.slug}
              to={`/blog/post/${encodeURIComponent(story.slug)}`}
              className="block min-w-[400px] max-w-xs"
            >
              <div className="rounded-lg border border-gray-100 bg-white shadow transition hover:shadow-lg">
                <img
                  src={story.img}
                  alt={story.title}
                  className="h-36 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <div className="mb-1 text-xs text-gray-400">{story.date}</div>
                  <div className="mb-2 line-clamp-1 text-base font-bold text-gray-900">
                    {story.title}
                  </div>
                  <div className="mb-2 line-clamp-2 text-sm text-gray-700">
                    {story.desc}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={story.avatar}
                      alt={story.author}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-gray-600">
                      {story.author}
                    </span>
                    <button className="ml-auto text-red-400 hover:text-red-500">
                      <IoIosHeart size={22} />
                    </button>
                    <button className="text-green-400 hover:text-purple-500">
                      <FaBookmark size={18} />
                    </button>
                    <button className="text-blue-400 hover:text-yellow-500">
                      <AiOutlineShareAlt size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Reads */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <h2 className="mb-4 text-xl font-semibold">Top Reads</h2>
        <div className="flex flex-col gap-6">
          {topReads.map((read, idx) => {
            const slug = slugify(read.title + "-" + idx);
            return (
              <Link
                key={idx}
                to={`/blog/post/${encodeURIComponent(slug)}`}
                className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow md:flex-row"
              >
                <img
                  src={read.img}
                  alt={read.title}
                  className="wfull h-[150px] w-[150px] rounded object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-800">
                    {read.title}
                  </div>
                  <div className="mb-2 text-xs text-gray-500">{read.tag}</div>
                  <div className="mb-2 text-xs text-gray-700">{read.desc}</div>
                  <div className="text-xs text-gray-400">{read.author}</div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className="h-8 w-8 rounded bg-gray-200 font-bold text-gray-700 hover:bg-green-600 hover:text-white"
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Wellness Journey Banner */}
      <section className="OurExpert mx-auto mb-8 flex max-w-7xl flex-col items-center rounded-lg bg-white px-4 py-4 shadow md:flex-row">
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-semibold">
            Start your wellness journey today!
          </h2>
          <p className="mb-4 text-gray-700">
            Chat with us on WhatsApp for customized diet plans and valuable
            health insights.
          </p>
          <Link
            to="/chat"
            className="rounded bg-green-600 px-6 py-2 font-semibold text-white shadow hover:bg-green-700"
          >
            Chat With Our Expert
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <img
            src="/blog/Homepage2.jpg"
            alt="Wellness"
            className="h-100 w-full rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mx-auto max-w-7xl px-4 py-6 pb-12">
        <h2 className="mb-4 text-xl font-semibold">Recent Posts</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {recentPosts.map((post, idx) => {
            const slug = slugify(post.title + "-" + idx);
            return (
              <Link
                key={idx}
                to={`/blog/post/${encodeURIComponent(slug)}`}
                className="rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="h-32 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <div className="mb-2 text-sm font-semibold text-gray-800">
                    {post.title}
                  </div>
                  <div className="text-xs text-gray-500">{post.author}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Render nested route content here */}
      <div className="mx-auto max-w-7xl px-4">
        <Outlet />
      </div>
    </div>
  );
}
