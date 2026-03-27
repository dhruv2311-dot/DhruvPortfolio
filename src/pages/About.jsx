import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaCode,
  FaYoutube,
  FaArrowRight,
  FaTrophy,
  FaChartLine
} from 'react-icons/fa';
import './About.css';

// ── Framer Motion Variants ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const traitVariants = {
  hidden:  { opacity: 0, y: 16, scale: 0.88 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

// ── Spring Social Card ────────────────────────────────────────
const SocialCard = ({ social }) => {
  const [hovered, setHovered] = useState(false);

  const cardSpring = useSpring({
    transform: hovered ? 'translateY(-10px) scale(1.03)' : 'translateY(0px) scale(1)',
    boxShadow: hovered
      ? `0 24px 48px ${social.color}28, 0 0 0 1px ${social.color}40`
      : '0 2px 16px rgba(0,0,0,0.25)',
    config: config.wobbly
  });

  const iconSpring = useSpring({
    transform: hovered ? 'scale(1.25) rotate(8deg)' : 'scale(1) rotate(0deg)',
    config: { tension: 320, friction: 10 }
  });

  return (
    <animated.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="about-social-card"
      style={{
        ...cardSpring,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1.5rem',
        background: 'linear-gradient(145deg, rgba(20,29,51,0.7) 0%, rgba(10,14,26,0.9) 100%)',
        borderRadius: '1.25rem',
        textDecoration: 'none',
        border: `1px solid ${hovered ? social.color + '35' : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(12px)',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease'
      }}
    >
      <animated.div
        style={{
          ...iconSpring,
          width: '62px',
          height: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${social.color}18`,
          borderRadius: '50%',
          fontSize: '1.8rem',
          color: social.color,
          marginBottom: '1rem'
        }}
      >
        {social.icon}
      </animated.div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.3rem' }}>
        {social.label}
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
        {social.description}
      </p>
    </animated.a>
  );
};

// ── Trait Badge ───────────────────────────────────────────────
const TraitBadge = ({ text, color = '#00d4ff' }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.45rem 1rem',
      background: `${color}12`,
      border: `1px solid ${color}30`,
      borderRadius: '999px',
      fontSize: '0.85rem',
      color: '#cbd5e1',
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }}
  >
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
    {text}
  </span>
);

const ProgressRow = ({ label, solved, total, color, subtitle }) => {
  const percent = Math.max(0, Math.min(100, Math.round((solved / total) * 100)));

  return (
    <div className="about-coding-progress-row">
      <div className="about-coding-progress-head">
        <div className="about-coding-progress-title-wrap">
          <span className="about-coding-progress-title">{label}</span>
          <span className="about-coding-progress-subtitle">{subtitle}</span>
        </div>
        <div className="about-coding-progress-meta">
          <span>{solved} / {total}</span>
          <span style={{ color }}>{percent}%</span>
        </div>
      </div>
      <div className="about-coding-progress-track">
        <div
          className="about-coding-progress-fill"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  );
};

const GITHUB_USERNAME = 'dhruv2311-dot';
const LEETCODE_USERNAME = 'dhruvvv_23';
const LIVE_REFRESH_MS = 60000;
const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';
const LEETCODE_PROFILE_ENDPOINT = `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`;
const LEETCODE_CONTEST_ENDPOINT = `https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${LEETCODE_USERNAME}`;
const GITHUB_CONTRIBUTIONS_HISTORY_ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const DEFAULT_LEETCODE_CONTEST = {
  contestRanking: 414102,
  contestsAttended: 6
};
const VERIFIED_GITHUB_YEARLY_BASELINE = {
  2026: 393,
  2025: 702,
  2024: 104
};

const STATIC_CONTRIBUTIONS_TOTAL = 928;
const STATIC_CONTRIBUTION_WEEKS = 53;
const STATIC_MONTH_LABELS = [
  { label: 'Mar', week: 1 },
  { label: 'Apr', week: 5 },
  { label: 'May', week: 9 },
  { label: 'Jun', week: 13 },
  { label: 'Jul', week: 17 },
  { label: 'Aug', week: 21 },
  { label: 'Sep', week: 25 },
  { label: 'Oct', week: 29 },
  { label: 'Nov', week: 33 },
  { label: 'Dec', week: 37 },
  { label: 'Jan', week: 41 },
  { label: 'Feb', week: 45 },
  { label: 'Mar', week: 49 }
];

const STATIC_ACTIVE_WEEKS = {
  0: '2000100',
  1: '1000000',
  3: '0201000',
  5: '0100010',
  6: '0011000',
  8: '1000100',
  9: '2200010',
  10: '1200000',
  12: '0100000',
  15: '1000000',
  19: '0110000',
  20: '1200100',
  21: '2001000',
  22: '0100010',
  23: '0010100',
  24: '0200000',
  25: '1020100',
  26: '2301010',
  27: '1210100',
  28: '3010000',
  29: '1102110',
  30: '0110210',
  31: '1022010',
  32: '2110200',
  33: '3011200',
  34: '2120100',
  35: '0112010',
  36: '1201100',
  37: '0212001',
  38: '2101100',
  39: '1112010',
  40: '2011200',
  41: '3112200',
  42: '2121100',
  43: '1210200',
  44: '0111000',
  45: '1010100',
  46: '2201100',
  47: '1122100',
  48: '2011200',
  49: '3212100',
  50: '2123100',
  51: '1012200',
  52: '2211100'
};

const buildStaticContributionCells = () => {
  const cells = [];

  for (let day = 0; day < 7; day += 1) {
    for (let week = 0; week < STATIC_CONTRIBUTION_WEEKS; week += 1) {
      const pattern = STATIC_ACTIVE_WEEKS[week] || '0000000';
      const level = Number(pattern[day]) || 0;

      cells.push({
        key: `w${week}-d${day}`,
        level
      });
    }
  }

  return cells;
};

const clampHeatLevel = (level) => {
  const numeric = Number(level);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(4, numeric));
};

const mergeYearlyTotals = (apiTotals = {}) => {
  const merged = { ...apiTotals };

  Object.entries(VERIFIED_GITHUB_YEARLY_BASELINE).forEach(([year, baseline]) => {
    const current = Number(merged[year]);
    merged[year] = Number.isFinite(current)
      ? Math.max(current, baseline)
      : baseline;
  });

  return merged;
};

const buildYearContributionView = (entries = [], year, yearlyTotals = {}) => {
  if (!Number.isFinite(year)) {
    return {
      cells: buildStaticContributionCells(),
      monthLabels: STATIC_MONTH_LABELS,
      total: STATIC_CONTRIBUTIONS_TOTAL,
      yearLabel: new Date().getFullYear()
    };
  }

  const contributionMap = new Map();
  const yearPrefix = `${year}-`;

  (Array.isArray(entries) ? entries : []).forEach((entry) => {
    if (!entry?.date || !String(entry.date).startsWith(yearPrefix)) return;
    contributionMap.set(entry.date, {
      count: Number(entry.count) || 0,
      level: clampHeatLevel(entry.level)
    });
  });

  const start = new Date(Date.UTC(year, 0, 1));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const end = new Date(Date.UTC(year, 11, 31));
  end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

  const weeks = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const week = [];
    for (let day = 0; day < 7; day += 1) {
      const isoDate = cursor.toISOString().slice(0, 10);
      const point = contributionMap.get(isoDate);
      week.push({
        date: isoDate,
        level: point?.level ?? 0
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  const cells = [];
  for (let day = 0; day < 7; day += 1) {
    for (let week = 0; week < weeks.length; week += 1) {
      cells.push({
        key: `y${year}-w${week}-d${day}`,
        level: weeks[week][day]?.level ?? 0
      });
    }
  }

  const monthLabels = [];
  let previousMonth = null;
  weeks.forEach((week, weekIndex) => {
    const firstDayOfMonth = week.find((item) => {
      const date = new Date(`${item.date}T00:00:00Z`);
      return date.getUTCDate() === 1;
    });

    if (!firstDayOfMonth) return;
    const monthLabel = new Date(`${firstDayOfMonth.date}T00:00:00Z`).toLocaleString('en-US', {
      month: 'short',
      timeZone: 'UTC'
    });

    if (monthLabel !== previousMonth) {
      monthLabels.push({ label: monthLabel, week: weekIndex + 1 });
      previousMonth = monthLabel;
    }
  });

  const total = Number(yearlyTotals?.[String(year)]);

  return {
    cells,
    monthLabels: monthLabels.length ? monthLabels : STATIC_MONTH_LABELS,
    total: Number.isFinite(total)
      ? total
      : Array.from(contributionMap.values()).reduce((sum, item) => sum + (item.count || 0), 0),
    yearLabel: year
  };
};

// ── Main Component ────────────────────────────────────────────
const About = () => {
  const { ref: sectionRef, inView }       = useInView({ threshold: 0.12, triggerOnce: true });
  const { ref: codingRef, inView: codingInView } = useInView({ threshold: 0.08, triggerOnce: true });
  const { ref: socialRef,  inView: socialInView } = useInView({ threshold: 0.08, triggerOnce: true });
  const [activeProfile, setActiveProfile] = useState('leetcode');
  const [githubData, setGithubData] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    recentEvents7d: 0,
    lastActivityAt: null,
    profileUrl: `https://github.com/${GITHUB_USERNAME}`,
    username: `@${GITHUB_USERNAME}`
  });
  const [githubContributionData, setGithubContributionData] = useState({
    cells: buildStaticContributionCells(),
    total: STATIC_CONTRIBUTIONS_TOTAL,
    monthLabels: STATIC_MONTH_LABELS,
    yearLabel: new Date().getFullYear(),
    years: [new Date().getFullYear()],
    totalsByYear: mergeYearlyTotals({}),
    historyEntries: []
  });
  const [selectedContributionYear, setSelectedContributionYear] = useState(new Date().getFullYear());
  const [leetcodeData, setLeetcodeData] = useState({
    totalSolved: 328,
    totalQuestions: 3873,
    easySolved: 210,
    totalEasy: 932,
    mediumSolved: 103,
    totalMedium: 2026,
    hardSolved: 15,
    totalHard: 915,
    ranking: 387674,
    contestRanking: DEFAULT_LEETCODE_CONTEST.contestRanking,
    contestsAttended: DEFAULT_LEETCODE_CONTEST.contestsAttended,
    profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
    username: `@${LEETCODE_USERNAME}`
  });

  const socialLinks = [
    { icon: <FaGithub />,   url: 'https://github.com/dhruv2311-dot',                       label: 'GitHub',     color: '#a78bfa', description: 'Open source & projects' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/dhruv-sonagra-995144321/',   label: 'LinkedIn',   color: '#0ea5e9', description: 'Professional network' },
    { icon: <FaTwitter />,  url: 'https://x.com/dhruvvv_23_',                              label: 'Twitter / X',color: '#38bdf8', description: 'Thoughts & updates' },
    { icon: <FaInstagram />,url: 'https://www.instagram.com/dhruvvv_23_/',                 label: 'Instagram',  color: '#f472b6', description: 'Behind the scenes' },
    { icon: <FaCode />,     url: 'https://leetcode.com/u/dhruvvv_23/',                     label: 'LeetCode',   color: '#fbbf24', description: 'DSA problem solving' },
    { icon: <FaYoutube />,  url: 'https://www.youtube.com/@Itz_dhruvv',                    label: 'YouTube',    color: '#f87171', description: 'Tech tutorials' }
  ];

  const traits = [
    { text: 'Full-Stack Development',    color: '#00d4ff' },
    { text: 'Scalable Web Apps',         color: '#8b5cf6' },
    { text: 'Intuitive UI/UX',           color: '#10b981' },
    { text: 'Performance Optimization',  color: '#f59e0b' },
    { text: 'Open Source Contribution',  color: '#f43f5e' },
    { text: 'Continuous Learning',       color: '#6366f1' }
  ];

  useEffect(() => {
    const toNumberOrNull = (value) => (typeof value === 'number' && Number.isFinite(value) ? value : null);
    const byDifficulty = (list, difficulty, fallback = null) => {
      const value = list.find((item) => item?.difficulty === difficulty)?.count;
      return typeof value === 'number' ? value : fallback;
    };
    let activeController = null;

    const fetchGithubData = async (signal) => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          signal,
          headers: { Accept: 'application/vnd.github+json' }
        });
        if (!userRes.ok) throw new Error('GitHub user fetch failed');

        const userJson = await userRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`, {
          signal,
          headers: { Accept: 'application/vnd.github+json' }
        });

        let totalStars = 0;
        if (reposRes.ok) {
          const reposJson = await reposRes.json();
          totalStars = reposJson.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        }

        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`, {
          signal,
          headers: { Accept: 'application/vnd.github+json' }
        });

        let recentEvents7d = 0;
        let lastActivityAt = null;

        if (eventsRes.ok) {
          const eventsJson = await eventsRes.json();
          if (eventsJson.length > 0) {
            lastActivityAt = eventsJson[0].created_at;
          }

          const now = Date.now();
          recentEvents7d = eventsJson.filter((event) => {
            const createdAt = new Date(event.created_at).getTime();
            const ageDays = (now - createdAt) / (1000 * 60 * 60 * 24);
            return ageDays <= 7;
          }).length;
        }

        setGithubData({
          publicRepos: userJson.public_repos || 0,
          followers: userJson.followers || 0,
          following: userJson.following || 0,
          totalStars,
          recentEvents7d,
          lastActivityAt,
          profileUrl: userJson.html_url || `https://github.com/${GITHUB_USERNAME}`,
          username: `@${userJson.login || GITHUB_USERNAME}`
        });

        const contributionsRes = await fetch(GITHUB_CONTRIBUTIONS_HISTORY_ENDPOINT, { signal });

        if (contributionsRes.ok) {
          const contributionsJson = await contributionsRes.json();
          const mergedTotals = mergeYearlyTotals(contributionsJson?.total || {});
          const years = Object.keys(mergedTotals)
            .map((year) => Number(year))
            .filter((year) => Number.isFinite(year))
            .sort((a, b) => b - a);

          setGithubContributionData((prev) => {
            const fallbackYear = years[0] || prev.yearLabel || new Date().getFullYear();
            const selectedYear = years.includes(selectedContributionYear)
              ? selectedContributionYear
              : fallbackYear;
            const view = buildYearContributionView(
              contributionsJson?.contributions,
              selectedYear,
              mergedTotals
            );

            return {
              ...prev,
              ...view,
              years: years.length ? years : prev.years,
              totalsByYear: mergedTotals,
              historyEntries: Array.isArray(contributionsJson?.contributions)
                ? contributionsJson.contributions
                : prev.historyEntries
            };
          });
        }
      } catch {
        if (signal?.aborted) return;
        // Keep previous values when API is unavailable.
      }
    };

    const fetchLeetCodeData = async (signal) => {
      try {
        let baseData = null;

        const query = `
          query getUserProfile($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              username
              profile {
                ranking
              }
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            userContestRanking(username: $username) {
              attendedContestsCount
              globalRanking
            }
          }
        `;

        const profileRes = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
          method: 'POST',
          signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query,
            variables: { username: LEETCODE_USERNAME }
          })
        });

        if (!profileRes.ok) throw new Error('LeetCode profile fetch failed');

        const profileJson = await profileRes.json();
        const data = profileJson?.data;
        const acSubmissionNum = data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
        const allQuestionsCount = data?.allQuestionsCount;

        if (!data?.matchedUser || !Array.isArray(acSubmissionNum) || !Array.isArray(allQuestionsCount)) {
          throw new Error('LeetCode GraphQL payload invalid');
        }

        baseData = {
          totalSolved: byDifficulty(acSubmissionNum, 'All', leetcodeData.totalSolved),
          totalQuestions: byDifficulty(allQuestionsCount, 'All', leetcodeData.totalQuestions),
          easySolved: byDifficulty(acSubmissionNum, 'Easy', leetcodeData.easySolved),
          totalEasy: byDifficulty(allQuestionsCount, 'Easy', leetcodeData.totalEasy),
          mediumSolved: byDifficulty(acSubmissionNum, 'Medium', leetcodeData.mediumSolved),
          totalMedium: byDifficulty(allQuestionsCount, 'Medium', leetcodeData.totalMedium),
          hardSolved: byDifficulty(acSubmissionNum, 'Hard', leetcodeData.hardSolved),
          totalHard: byDifficulty(allQuestionsCount, 'Hard', leetcodeData.totalHard),
          ranking: toNumberOrNull(data?.matchedUser?.profile?.ranking),
          contestRanking: toNumberOrNull(data?.userContestRanking?.globalRanking),
          contestsAttended: toNumberOrNull(data?.userContestRanking?.attendedContestsCount),
          username: `@${data?.matchedUser?.username || LEETCODE_USERNAME}`
        };
      } catch {
        if (signal?.aborted) return;
      }

      if (!baseData) {
        try {
          const fallbackRes = await fetch(LEETCODE_PROFILE_ENDPOINT, { signal });
          if (fallbackRes.ok) {
            const fallbackJson = await fallbackRes.json();
            baseData = {
              totalSolved: toNumberOrNull(fallbackJson?.totalSolved),
              totalQuestions: toNumberOrNull(fallbackJson?.totalQuestions),
              easySolved: toNumberOrNull(fallbackJson?.easySolved),
              totalEasy: toNumberOrNull(fallbackJson?.totalEasy),
              mediumSolved: toNumberOrNull(fallbackJson?.mediumSolved),
              totalMedium: toNumberOrNull(fallbackJson?.totalMedium),
              hardSolved: toNumberOrNull(fallbackJson?.hardSolved),
              totalHard: toNumberOrNull(fallbackJson?.totalHard),
              ranking: toNumberOrNull(fallbackJson?.ranking),
              contestRanking: null,
              contestsAttended: null,
              username: `@${LEETCODE_USERNAME}`
            };
          }
        } catch {
          if (signal?.aborted) return;
        }
      }

      if (!baseData || !Number.isFinite(baseData.totalSolved) || baseData.totalSolved <= 0) {
        return;
      }

      let contestData = {
        contestRanking: baseData.contestRanking,
        contestsAttended: baseData.contestsAttended
      };

      if (contestData.contestRanking == null || contestData.contestsAttended == null) {
        try {
          const contestRes = await fetch(LEETCODE_CONTEST_ENDPOINT, { signal });
          if (contestRes.ok) {
            const contestJson = await contestRes.json();
            contestData = {
              contestRanking: toNumberOrNull(contestJson?.data?.userContestRanking?.globalRanking),
              contestsAttended: toNumberOrNull(contestJson?.data?.userContestRanking?.attendedContestsCount)
            };
          }
        } catch {
          if (signal?.aborted) return;
        }
      }

      setLeetcodeData((prev) => ({
        totalSolved: baseData.totalSolved ?? prev.totalSolved,
        totalQuestions: baseData.totalQuestions ?? prev.totalQuestions,
        easySolved: baseData.easySolved ?? prev.easySolved,
        totalEasy: baseData.totalEasy ?? prev.totalEasy,
        mediumSolved: baseData.mediumSolved ?? prev.mediumSolved,
        totalMedium: baseData.totalMedium ?? prev.totalMedium,
        hardSolved: baseData.hardSolved ?? prev.hardSolved,
        totalHard: baseData.totalHard ?? prev.totalHard,
        ranking: baseData.ranking ?? prev.ranking,
        contestRanking: contestData.contestRanking ?? prev.contestRanking ?? DEFAULT_LEETCODE_CONTEST.contestRanking,
        contestsAttended: contestData.contestsAttended ?? prev.contestsAttended ?? DEFAULT_LEETCODE_CONTEST.contestsAttended,
        profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
        username: baseData.username ?? prev.username
      }));
    };

    const refreshLiveData = async () => {
      activeController?.abort();
      activeController = new AbortController();
      const { signal } = activeController;

      await Promise.allSettled([
        fetchGithubData(signal),
        fetchLeetCodeData(signal)
      ]);
    };

    const intervalId = window.setInterval(refreshLiveData, LIVE_REFRESH_MS);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshLiveData();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    refreshLiveData();

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      activeController?.abort();
    };
  }, []);

  useEffect(() => {
    if (!githubContributionData.years.includes(selectedContributionYear)) {
      setSelectedContributionYear(githubContributionData.years[0] || new Date().getFullYear());
    }
  }, [githubContributionData.years, selectedContributionYear]);

  useEffect(() => {
    if (!githubContributionData.historyEntries.length) return;

    const view = buildYearContributionView(
      githubContributionData.historyEntries,
      selectedContributionYear,
      githubContributionData.totalsByYear
    );

    setGithubContributionData((prev) => ({
      ...prev,
      ...view
    }));
  }, [selectedContributionYear, githubContributionData.historyEntries, githubContributionData.totalsByYear]);

  const codingProfiles = useMemo(() => {
    const solvedPercent = leetcodeData.totalQuestions
      ? Math.round((leetcodeData.totalSolved / leetcodeData.totalQuestions) * 100)
      : 0;

    const now = Date.now();
    const lastActivityMs = githubData.lastActivityAt ? new Date(githubData.lastActivityAt).getTime() : null;
    const daysSinceActivity = typeof lastActivityMs === 'number'
      ? Math.floor((now - lastActivityMs) / (1000 * 60 * 60 * 24))
      : null;

    const githubActivity = {
      isActive: daysSinceActivity !== null && daysSinceActivity <= 3,
      label:
        daysSinceActivity === null
          ? 'Activity unavailable'
          : daysSinceActivity === 0
            ? 'Active today'
            : daysSinceActivity === 1
              ? 'Active 1 day ago'
              : `Active ${daysSinceActivity} days ago`,
      recentEvents7d: githubData.recentEvents7d
    };

    const contributions = githubContributionData.cells;

    return {
      leetcode: {
        label: 'LeetCode',
        url: leetcodeData.profileUrl,
        username: leetcodeData.username,
        heading: 'Algorithm Master',
        subHeading: 'Optimizing algorithms and solving complex DSA challenges.',
        heroStat: String(leetcodeData.totalSolved),
        heroLabel: 'Problems Solved',
        ringPercent: Math.max(0, Math.min(100, solvedPercent)),
        primaryStats: [
          {
            label: 'Global Ranking',
                value: typeof leetcodeData.ranking === 'number'
                  ? leetcodeData.ranking.toLocaleString('en-IN')
                  : 'N/A'
          },
          { label: 'Solved Ratio', value: `${Math.max(0, solvedPercent)}%` }
        ],
        difficulty: [
          {
            label: 'Easy',
            subtitle: 'Foundation & Logic',
            solved: leetcodeData.easySolved,
            total: leetcodeData.totalEasy,
            color: '#22c55e'
          },
          {
            label: 'Medium',
            subtitle: 'Algorithms & Optimization',
            solved: leetcodeData.mediumSolved,
            total: leetcodeData.totalMedium,
            color: '#fbbf24'
          },
          {
            label: 'Hard',
            subtitle: 'Advanced Problem Solving',
            solved: leetcodeData.hardSolved,
            total: leetcodeData.totalHard,
            color: '#ef4444'
          }
        ],
        extraStats: [
          {
            icon: <FaTrophy />,
            label: 'Contest Ranking',
                value: typeof leetcodeData.contestRanking === 'number'
                  ? leetcodeData.contestRanking.toLocaleString('en-IN')
                  : 'N/A'
          },
          {
            icon: <FaChartLine />,
            label: 'Contests Attended',
            value: leetcodeData.contestsAttended ?? 'N/A'
          }
        ]
      },
      github: {
        label: 'GitHub Profile',
        url: githubData.profileUrl,
        username: githubData.username,
        heading: 'Code Architect',
        subHeading: 'Crafting scalable digital ecosystems and contributing to open source.',
        heroStat: `${githubData.publicRepos}+`,
        heroLabel: 'Public Repos',
        ringPercent: Math.max(10, Math.min(100, Math.round((githubData.publicRepos / 100) * 100))),
        activity: githubActivity,
        contributions,
        contributionsTotal: githubContributionData.total,
        monthLabels: githubContributionData.monthLabels,
        contributionYearLabel: githubContributionData.yearLabel,
        availableYears: githubContributionData.years,
        primaryStats: [
          { label: 'Public Repos', value: `${githubData.publicRepos}+` },
          { label: 'Stars Earned', value: `${githubData.totalStars}+` }
        ],
        extraStats: [
          { icon: <FaGithub />, label: 'Followers', value: `${githubData.followers}+` },
          { icon: <FaCode />, label: 'Following', value: `${githubData.following}+` },
          { icon: <FaChartLine />, label: 'Events (7 Days)', value: String(githubData.recentEvents7d) }
        ]
      }
    };
  }, [githubData, githubContributionData, leetcodeData]);

  const currentProfile = codingProfiles[activeProfile];

  return (
    <>
      <Helmet>
        <title>About | Dhruv Sonagra</title>
        <meta name="description" content="Dhruv Sonagra — Full-Stack Developer passionate about building scalable, elegant web experiences." />
        <link rel="canonical" href="https://dhruvsonagra.me/about" />
        <meta property="og:url" content="https://dhruvsonagra.me/about" />
      </Helmet>

      <main className="about" style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">

          {/* ── Profile Row ───────────────────────────────── */}
          <section ref={sectionRef} style={{ marginBottom: '6rem' }}>
            <div className="about-profile-grid">
              {/* Photo Column */}
              <motion.div
                className="about-photo-col"
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="about-photo-glow" />
                <div className="about-orbit about-orbit-1" />
                <div className="about-orbit about-orbit-2" />
                <div className="about-photo-frame">
                  <img
                    src="https://res.cloudinary.com/dtkzxbcjx/image/upload/v1770642896/IMG_1208_uxkdnq.png"
                    alt="Dhruv Sonagra"
                    className="about-photo-img"
                  />
                </div>
                <motion.div
                  className="about-status-badge"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="about-status-dot" />
                  Open to Opportunities
                </motion.div>
              </motion.div>

              {/* Text Column — framer stagger */}
              <motion.div
                className="about-text-col"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <motion.span variants={itemVariants} className="about-eyebrow">
                  About Me
                </motion.span>

                <motion.h1 variants={itemVariants} className="about-heading">
                  Hi, I'm{' '}
                  <span className="about-name-gradient">Dhruv Sonagra</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="about-bio-text">
                  I'm a passionate{' '}
                  <strong style={{ color: '#e2e8f0' }}>Full-Stack Developer</strong> with a
                  strong foundation in both frontend and backend technologies. My journey started
                  with curiosity about how the internet works and has evolved into a professional
                  pursuit of crafting{' '}
                  <strong style={{ color: '#e2e8f0' }}>elegant, scalable, and user-centric</strong>{' '}
                  applications.
                </motion.p>

                <motion.p variants={itemVariants} className="about-bio-sub">
                  When I'm not building things, I'm exploring new tech, solving problems on
                  LeetCode, or contributing to open-source. I believe clean code and great design
                  go hand in hand.
                </motion.p>

                {/* Trait badges — stagger via containerVariants child */}
                <motion.div
                  variants={containerVariants}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2.5rem' }}
                >
                  {traits.map((t, i) => (
                    <motion.span key={i} variants={traitVariants}>
                      <TraitBadge text={t.text} color={t.color} />
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
                >
                  <motion.a
                    href="https://drive.google.com/file/d/16PhnI0TIbZ2O18uKjFpml7jxzh_m9SJg/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-btn-primary"
                    whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,212,255,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaDownload />
                    Download Resume
                  </motion.a>
                  <motion.a
                    href="#connect"
                    className="about-btn-ghost"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Let's Connect
                    <FaArrowRight style={{ marginLeft: '0.4rem' }} />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ── Divider ───────────────────────────────────── */}
          <div className="about-section-divider" />

          {/* ── Coding Profiles Section ───────────────────── */}
          <section ref={codingRef} style={{ marginBottom: '6rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={codingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '2.2rem' }}
            >
              <span className="about-eyebrow">Coding Ecosystem</span>
              <h2 className="about-section-heading">
                My <span className="about-name-gradient">Coding Profiles</span>
              </h2>
            </motion.div>

            <motion.div
              className="about-coding-layout"
              initial={{ opacity: 0, y: 30 }}
              animate={codingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <aside className="about-coding-side-card">
                <div className="about-coding-switcher">
                  <button
                    type="button"
                    className={`about-coding-switch-btn ${activeProfile === 'leetcode' ? 'active' : ''}`}
                    onClick={() => setActiveProfile('leetcode')}
                  >
                    <FaCode /> LeetCode
                  </button>
                  <button
                    type="button"
                    className={`about-coding-switch-btn ${activeProfile === 'github' ? 'active' : ''}`}
                    onClick={() => setActiveProfile('github')}
                  >
                    <FaGithub /> GitHub Profile
                  </button>
                </div>

                <div className="about-coding-hero">
                  <div
                    className="about-coding-ring"
                    style={{ '--ring-percent': `${currentProfile.ringPercent}%` }}
                  >
                    <div className="about-coding-ring-inner">
                      <strong>{currentProfile.heroStat}</strong>
                      <span>{currentProfile.heroLabel}</span>
                    </div>
                  </div>

                  <h3>{currentProfile.heading}</h3>
                  <p>{currentProfile.subHeading}</p>

                  <div className="about-coding-stat-grid">
                    {currentProfile.primaryStats.map((stat) => (
                      <div key={stat.label} className="about-coding-mini-stat">
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                      </div>
                    ))}
                  </div>

                  <a
                    href={currentProfile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-coding-profile-btn"
                  >
                    Open Profile
                  </a>
                </div>
              </aside>

              <div className="about-coding-main-card">
                {activeProfile === 'leetcode' ? (
                  <>
                    <div className="about-coding-main-head">
                      <h3>LeetCode Insights</h3>
                      <span>{currentProfile.username}</span>
                    </div>

                    <div className="about-coding-progress-wrap">
                      {currentProfile.difficulty.map((item) => (
                        <ProgressRow
                          key={item.label}
                          label={item.label}
                          subtitle={item.subtitle}
                          solved={item.solved}
                          total={item.total}
                          color={item.color}
                        />
                      ))}
                    </div>

                    <div className="about-coding-extra-stats">
                      {currentProfile.extraStats.map((stat) => (
                        <div key={stat.label} className="about-coding-extra-card">
                          <span className="about-coding-extra-icon">{stat.icon}</span>
                          <span className="about-coding-extra-label">{stat.label}</span>
                          <strong className="about-coding-extra-value">{stat.value}</strong>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="about-coding-main-head">
                      <h3>GitHub Insights</h3>
                      <span>{currentProfile.username}</span>
                    </div>

                    <div className="about-github-contrib-card">
                      <p className="about-github-contrib-total">
                        {currentProfile.contributionsTotal} contributions in the last year
                      </p>
                      <p className="about-github-contrib-note">
                        Year totals auto-refresh and include your verified profile baseline.
                      </p>
                      <div className="about-github-contrib-head">
                        <span>Contributions</span>
                        <div className="about-github-year-picker" role="group" aria-label="Contribution year selector">
                          {currentProfile.availableYears.map((year) => (
                            <button
                              key={year}
                              type="button"
                              className={`about-github-year-btn ${selectedContributionYear === year ? 'active' : ''}`}
                              onClick={() => setSelectedContributionYear(year)}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="about-github-contrib-calendar">
                        <div className="about-github-contrib-days">
                          <span>Mon</span>
                          <span>Wed</span>
                          <span>Fri</span>
                        </div>

                        <div className="about-github-contrib-board-wrap">
                          <div className="about-github-contrib-months">
                            {currentProfile.monthLabels.map((month) => (
                              <span key={`${month.label}-${month.week}`} style={{ gridColumnStart: month.week }}>
                                {month.label}
                              </span>
                            ))}
                          </div>

                          <div className="about-github-contrib-grid">
                            {currentProfile.contributions.map((cell) => (
                              <span
                                key={cell.key}
                                className={`about-github-contrib-cell level-${cell.level}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="about-github-contrib-legend">
                        <span>Less</span>
                        <div className="about-github-contrib-legend-scale">
                          <span className="about-github-contrib-cell level-0" />
                          <span className="about-github-contrib-cell level-1" />
                          <span className="about-github-contrib-cell level-2" />
                          <span className="about-github-contrib-cell level-3" />
                          <span className="about-github-contrib-cell level-4" />
                        </div>
                        <span>More</span>
                      </div>
                    </div>

                    <div className="about-github-activity">
                      <span
                        className={`about-github-activity-dot ${currentProfile.activity.isActive ? 'active' : 'inactive'}`}
                      />
                      <span className="about-github-activity-text">{currentProfile.activity.label}</span>
                      <span className="about-github-activity-events">
                        {currentProfile.activity.recentEvents7d} events in last 7 days
                      </span>
                    </div>

                    <div className="about-coding-extra-stats">
                      {currentProfile.extraStats.map((stat) => (
                        <div key={stat.label} className="about-coding-extra-card">
                          <span className="about-coding-extra-icon">{stat.icon}</span>
                          <span className="about-coding-extra-label">{stat.label}</span>
                          <strong className="about-coding-extra-value">{stat.value}</strong>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </section>

          {/* ── Divider ───────────────────────────────────── */}
          <div className="about-section-divider" />

          {/* ── Social / Connect Section ──────────────────── */}
          <section id="connect" ref={socialRef} style={{ paddingBottom: '7rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={socialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <span className="about-eyebrow">Social</span>
              <h2 className="about-section-heading">
                Let's <span className="about-name-gradient">Connect</span>
              </h2>
              <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                Whether it's a project, collaboration, or just a chat about tech — I'm always reachable.
              </p>
            </motion.div>

            <motion.div
              className="about-social-grid"
              variants={containerVariants}
              initial="hidden"
              animate={socialInView ? 'visible' : 'hidden'}
            >
              {socialLinks.map((social) => (
                <motion.div key={social.label} variants={itemVariants}>
                  <SocialCard social={social} />
                </motion.div>
              ))}
            </motion.div>
          </section>

        </div>
      </main>
    </>
  );
};

export default About;
