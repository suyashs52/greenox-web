import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  latestStories,
  topReads as _topReads,
  recentPosts as _recentPosts,
} from "../Blog/Blog";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaBookmark,
  FaLink,
} from "react-icons/fa";

const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(slug || "");

  // resolve post from available sources
  const post = useMemo(() => {
    let p = latestStories.find((x) => x.slug === decoded);
    if (p) return p;

    p =
      _topReads
        .map((p, i) => ({ ...p, _slug: slugify(p.title + "-" + i) }))
        .find((p) => p._slug === decoded) ||
      _recentPosts
        .map((p, i) => ({ ...p, _slug: slugify(p.title + "-" + i) }))
        .find((p) => p._slug === decoded);

    return p;
  }, [decoded]);

  // Table of contents open state
  const [isTableOpen, setIsTableOpen] = useState(true);

  // share state
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/blog/post/${encodeURIComponent(decoded)}`;
  const shareText = post?.title || "";

  const openPopup = (url) => {
    window.open(url, "shareWindow", "width=600,height=500,noopener,noreferrer");
  };

  const shareTo = (platform) => {
    // Prefer native share on supported devices
    if (navigator.share) {
      navigator
        .share({
          title: shareText,
          text: post?.excerpt || shareText,
          url: shareUrl,
        })
        .catch(() => {
          /* ignore */
        });
      return;
    }

    switch (platform) {
      case "facebook":
        openPopup(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "twitter":
        openPopup(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(
            shareUrl,
          )}`,
        );
        break;
      case "linkedin":
        openPopup(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "whatsapp":
        openPopup(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(
          shareUrl,
        )}`;
        break;
      default:
        break;
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: open native share dialog if available
      if (navigator.share) {
        navigator
          .share({
            title: shareText,
            text: post?.excerpt || shareText,
            url: shareUrl,
          })
          .catch(() => {});
      }
    }
  };

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">Post not found</h1>
        <p className="mb-4">Slug: {decoded}</p>
        <Link to="/blog" className="text-green-600 underline">
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-gray-50">
      {/* Header / Hero */}
      <div className="relative h-[400px]">
        <img
          src={post.img || "/img/blog-default.jpg"}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
          <button
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate("/blog")
            }
            className="mb-4 rounded bg-white/90 px-3 py-1 text-sm shadow hover:opacity-95"
            type="button"
          >
            ← Back to Blog
          </button>

          <div className="mt-8 max-w-6xl text-white">
            <h1 className="mb-4 text-4xl font-extrabold leading-tight">
              {post.title}
            </h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar || "/img/avatar-placeholder.png"}
                  alt={post.author}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <div className="text-sm font-semibold">
                    {post.author || "Author"}
                  </div>
                  <div className="text-xs">{post.date}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Main article */}
          <article className="lg:col-span-2">
            <div className="mb-6 rounded-lg bg-white p-8 shadow">
              <div className="prose max-w-none text-green-700">
                {/* Intro / excerpt */}
                {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}

                {/* Sample content rendering - replace with real HTML/content as needed */}
                <div
                  className="text-2xl font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: post.full || post.desc || "<p>No content</p>",
                  }}
                />
              </div>
            </div>

            {/* Table of contents box (visual) */}
            {/* Table of Contents */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Table of Contents</h2>
                <button
                  onClick={() => setIsTableOpen(!isTableOpen)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={isTableOpen ? "Collapse menu" : "Expand menu"}
                >
                  <svg
                    className={`h-6 w-6 transform transition-transform ${
                      isTableOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {isTableOpen && (
                <ol className="list-decimal pl-5 text-gray-600">
                  <li className="mb-2">
                    <a href="#parathas" className="hover:text-green-600">
                      Parathas? No, please!
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#toast" className="hover:text-green-600">
                      Bye-bye buttered toast
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#noodles" className="hover:text-green-600">
                      Instant noodles? No-no
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#vada" className="hover:text-green-600">
                      Vada Pav is out
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#misal" className="hover:text-green-600">
                      Misal Pav? After a makeover
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#pancakes" className="hover:text-green-600">
                      Pancakes, only whole wheat
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#puri" className="hover:text-green-600">
                      Puri bhaji? Sorry!
                    </a>
                  </li>
                </ol>
              )}
            </div>
            {/* Article Content */}
            <div className="space-y-8">
              <section id="parathas" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Parathas? No, please!
                </h2>
                <p className="text-gray-700">
                  Stick to whole-wheat atta, and roast them instead of frying in
                  oil. Lose the butter and pickle, and add aloo stuffing.
                  Instead, add palak puree to the dough, or stuff with methi
                  greens mashed and boiled peas, beans and carrots.
                </p>
              </section>

              <section id="toast" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Bye-bye buttered toast
                </h2>
                <p className="text-gray-700">
                  Have a grilled brown bread sandwich instead with cucumber and
                  tomato and some green chutney to add some zing.
                </p>
              </section>

              <section id="noodles" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Instant noodles? No-no
                </h2>
                <p className="text-gray-700">
                  Instead, use vermicelli, mixed spices and lots of vegetables
                  to make a tasty and wholesome upma-style preparation.
                </p>
              </section>

              <section id="vada" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">Vada Pav is out</h2>
                <p className="text-gray-700">
                  Skip the vada pav, and opt for a whole grain sandwich with
                  veggies and a protein source like paneer or tofu.
                </p>
              </section>

              <section id="misal" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Misal Pav? After a makeover
                </h2>
                <p className="text-gray-700">
                  Go for a healthier misal made with sprouts, topped with
                  onions, tomatoes, and a squeeze of lemon. Skip the pav or
                  choose whole wheat pav.
                </p>
              </section>

              <section id="pancakes" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Pancakes, only whole wheat
                </h2>
                <p className="text-gray-700">
                  Enjoy pancakes made with whole wheat flour, and skip the
                  syrup. Top with fresh fruits, nuts, and a drizzle of honey or
                  maple syrup.
                </p>
              </section>

              <section id="puri" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">Puri bhaji? Sorry!</h2>
                <p className="text-gray-700">
                  Avoid puri bhaji, and choose a bowl of poha or upma loaded
                  with vegetables. It's lighter and packed with nutrients.
                </p>
              </section>
            </div>
          </article>

          {/* Right column: author + social + meta */}
          <aside className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center gap-4">
                <img
                  src={post.avatar || "/img/avatar-placeholder.png"}
                  alt={post.author}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {post.author || "Author"}
                  </div>
                  <div className="text-xs text-gray-500">{post.date}</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                {post.bio || "Short author bio goes here."}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => shareTo("facebook")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded bg-blue-600 text-white"
                  aria-label="Share to Facebook"
                  type="button"
                >
                  <FaFacebookF />
                </button>

                <button
                  onClick={() => shareTo("twitter")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded bg-sky-500 text-white"
                  aria-label="Share to Twitter"
                  type="button"
                >
                  <FaTwitter />
                </button>

                <button
                  onClick={() => shareTo("linkedin")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded bg-blue-700 text-white"
                  aria-label="Share to LinkedIn"
                  type="button"
                >
                  <FaLinkedinIn />
                </button>

                <button
                  onClick={() => shareTo("whatsapp")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded bg-green-500 text-white"
                  aria-label="Share to WhatsApp"
                  type="button"
                >
                  <FaWhatsapp />
                </button>

                <button
                  onClick={copyLink}
                  className="inline-flex h-9 w-9 items-center justify-center rounded border text-gray-700"
                  aria-label="Copy link"
                  type="button"
                  title={copied ? "Copied" : "Copy link"}
                >
                  <FaLink />
                </button>

                <button
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded border text-green-600"
                  aria-label="Save"
                  type="button"
                >
                  <FaBookmark />
                </button>
              </div>

              {copied && (
                <div className="mt-2 text-sm text-green-600">
                  Link copied to clipboard
                </div>
              )}
            </div>

            {/* Recommended / recent posts */}
            <div className="rounded-lg bg-white p-4 shadow">
              <h4 className="mb-3 text-sm font-semibold text-gray-700">
                Recent Posts
              </h4>
              <div className="space-y-3">
                {_recentPosts.slice(0, 4).map((p, i) => {
                  const s = slugify(p.title + "-" + i);
                  return (
                    <Link
                      key={i}
                      to={`/blog/post/${encodeURIComponent(s)}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div className="text-sm text-gray-700">{p.title}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
