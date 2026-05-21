import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Trophy,
  Users,
  Volume2,
  VolumeX,
  Plus,
  Send,
  HelpCircle,
  RotateCw,
  Award,
  Calendar,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Bell,
  Check,
  ChevronRight,
  TrendingUp,
  FileText,
  User,
  LogOut,
  Trash2,
  Bookmark,
  Share2,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { SpellingWord, QuizSession, Badge, TrackedProgress } from "./types";

// ==========================================
// PRE-LOADED STANDARD THEMATIC SPELLING LISTS
// ==========================================
const DEFAULT_QUIZZES = [
  {
    id: "space-odyssey",
    theme: "Space & Planets 🚀",
    grade: "Grade 2",
    description: "Blast off into space spelling words!",
    words: [
      {
        word: "planet",
        phonetics: "plan-et",
        definition: "A large round object in space that circles around a star like the Sun.",
        sentence: "Earth is the third planet from our Sun.",
        clue: "A big spinning playground in outer space where countries live."
      },
      {
        word: "rocket",
        phonetics: "rock-et",
        definition: "A powerful vehicle used to fly people and satellites into space.",
        sentence: "The shiny silver rocket blasted off into the sky!",
        clue: "It flies extremely fast to the moon with a massive fiery tail."
      },
      {
        word: "comet",
        phonetics: "co-met",
        definition: "A bright icy space rock with a long glowing dusty tail.",
        sentence: "We saw a glowing comet speed across the night sky.",
        clue: "A dirty space snowball with a beautiful shining tail."
      },
      {
        word: "gravity",
        phonetics: "grav-it-y",
        definition: "The invisible superpower pull that keeps our feet flat on the ground.",
        sentence: "Without gravity, we would float away into the clouds!",
        clue: "The magic earthly glue that pulls apples down from trees."
      },
      {
        word: "crater",
        phonetics: "cra-ter",
        definition: "A large bowl-shaped hollow circle left behind by a crash in rock.",
        sentence: "The moon is covered in sandy craters from ancient meteor hits.",
        clue: "A big giant scoop hole in the moon's dusty surface."
      },
      {
        word: "galaxy",
        phonetics: "gal-ax-y",
        definition: "A massive spiral city of billions of shining stars, gas, and planets.",
        sentence: "Our planet belongs to the magnificent Milky Way galaxy.",
        clue: "A swirling cosmic island containing billions of stars."
      }
    ]
  },
  {
    id: "animal-kingdom",
    theme: "Wild Animals 🦁",
    grade: "Grade 1",
    description: "Noises, tails, and happy paws!",
    words: [
      {
        word: "giraffe",
        phonetics: "gi-raffe",
        definition: "A very tall animal with an extremely long neck and brown spots.",
        sentence: "The gentle giraffe nibbled on leaves high up in the acacia tree.",
        clue: "I have spotty yellow skin and can chew tree leaves without climbing."
      },
      {
        word: "monkey",
        phonetics: "mon-key",
        definition: "A playful furry animal with a long tail that loves climbing trees.",
        sentence: "The funny monkey hung upside down by its tail and ate a banana.",
        clue: "I love swinging from branch to branch making silly 'ooh-ooh-aah-aah' noises!"
      },
      {
        word: "zebra",
        phonetics: "ze-bra",
        definition: "A wild African horse with beautiful black and white stripes.",
        sentence: "The zebra family ran like wind over the grasslands.",
        clue: "I look like a happy pony dressed up in black-and-white pajamas."
      },
      {
        word: "tiger",
        phonetics: "ti-ger",
        definition: "A massive striped orange cat who is a powerful hunter in the jungle.",
        sentence: "The orange tiger walked silently through the tall forest grass.",
        clue: "A gigantic predator cat with black stripes and a fierce jungle roar!"
      },
      {
        word: "elephant",
        phonetics: "el-e-phant",
        definition: "The largest land animal on Earth with big floppy ears and a long trunk.",
        sentence: "The friendly elephant sprayed cool water from its trunk to stay cool.",
        clue: "I have huge fan-like ears and use my nose as a giant water hose."
      }
    ]
  },
  {
    id: "cookie-kitchen",
    theme: "Delicious Kitchen 🍪",
    grade: "Grade 2",
    description: "Tasty treats and baking words!",
    words: [
      {
        word: "cookie",
        phonetics: "coo-kie",
        definition: "A sweet baked biscuit often filled with chocolate chips.",
        sentence: "Grandma baked fresh chocolate chip cookies that smelled amazing.",
        clue: "A round crunchy dessert that lives in a jar and pairs perfectly with milk."
      },
      {
        word: "butter",
        phonetics: "but-ter",
        definition: "A soft, creamy yellow food made from milk used to bake and spread.",
        sentence: "We melted golden butter in the pan to make yummy pancakes.",
        clue: "I am yellow and greasy, melt on hot toast, and make muffins taste magical."
      },
      {
        word: "sugar",
        phonetics: "su-gar",
        definition: "Sweet white crystals used to make cakes, candies, and tea delicious.",
        sentence: "Don't add too much sugar, or the pie will be too sweet!",
        clue: "White crystals that taste extremely sweet and go into birthday cakes."
      },
      {
        word: "kitchen",
        phonetics: "kit-chen",
        definition: "A special magic room in the house where yummy raw foods are cooked.",
        sentence: "The entire kitchen smelled like fresh cinnamon rolls.",
        clue: "The room containing the stove, baking pans, and the delicious refrigerator."
      },
      {
        word: "recipe",
        phonetics: "rec-i-pe",
        definition: "A clear set of baking instructions on how to prepare a delicious treat.",
        sentence: "We followed the secret family recipe to bake the cake.",
        clue: "The written paper map that lists ingredients and baking steps."
      }
    ]
  }
];

// ==========================================
// CUTE SPELLING HELPER IMAGES
// ==========================================
const WORD_IMAGES: Record<string, string> = {
  planet: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=300&q=80",
  rocket: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=300&q=80",
  comet: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=300&q=80",
  gravity: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=300&q=80",
  crater: "https://images.unsplash.com/photo-1608178398319-48f814d0750c?auto=format&fit=crop&w=300&q=80",
  galaxy: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=300&q=80",
  
  giraffe: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=300&q=80",
  monkey: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=300&q=80",
  zebra: "https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&w=300&q=80",
  tiger: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=300&q=80",
  elephant: "https://images.unsplash.com/photo-1581850518616-bcb8077fa212?auto=format&fit=crop&w=300&q=80",
  
  cookie: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80",
  butter: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=300&q=80",
  sugar: "https://images.unsplash.com/photo-1581781868779-11ba107be678?auto=format&fit=crop&w=300&q=80",
  kitchen: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80",
  recipe: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=300&q=80",

  apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80",
  orange: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=300&q=80",
  cat: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80",
  dog: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80",
  lion: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=300&q=80",
  star: "https://images.unsplash.com/photo-1502485019198-a625bd53ceb7?auto=format&fit=crop&w=300&q=80",
  sun: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?auto=format&fit=crop&w=300&q=80",
  moon: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=300&q=80",
  rainbow: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=300&q=80"
};

function getWordImage(word: string): string {
  const clean = word.toLowerCase().trim();
  if (WORD_IMAGES[clean]) {
    return WORD_IMAGES[clean];
  }
  // Safe high quality fairytale drawing illustration for unmapped items
  return `https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&q=80`;
}

// ==========================================
// CUTE BADGES DEF LIST
// ==========================================
const DEFAULT_BADGES: Badge[] = [
  { id: "perfect", title: "Perfect Speller", emoji: "⭐", description: "Got 100% on any spelling quiz!", unlocked: false },
  { id: "streak-3", title: "Triple Threat", emoji: "🔥", description: "Maintained a 3-day active practice streak!", unlocked: false },
  { id: "streak-7", title: "Super Speller", emoji: "🦁", description: "Maintained a 7-day magic spelling streak!", unlocked: false },
  { id: "space-master", title: "Cosmic Voyager", emoji: "🚀", description: "Completed any Space & Planets themed test!", unlocked: false },
  { id: "animal-friend", title: "Forest Explorer", emoji: "🐢", description: "Mastered the Wild Animals quiz list!", unlocked: false },
  { id: "chef", title: "Master Chef", emoji: "🧁", description: "Completed the Delicious Kitchen spelling words!", unlocked: false },
  { id: "parent-special", title: "Homework Hero", emoji: "👑", description: "Finished a spelling list crafted especially by Mom or Dad!", unlocked: false }
];

export default function App() {
  // Navigation: 'dashboard' | 'practice' | 'rewards' | 'parents'
  const [activeTab, setActiveTab] = useState<"dashboard" | "practice" | "rewards" | "parents">("dashboard");

  // Core User Config States
  const [studentName, setStudentName] = useState<string>("Leo");
  const [studentAvatar, setStudentAvatar] = useState<string>("🦁");
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  // Gamification & Kid voice controls state
  const [studentXp, setStudentXp] = useState<number>(310);
  const [xpNotification, setXpNotification] = useState<string | null>(null);
  const [audioSpeedRate, setAudioSpeedRate] = useState<number>(0.75);

  // App Database States persisted in localStorage
  const [streak, setStreak] = useState<number>(7);
  const [sessions, setSessions] = useState<QuizSession[]>([]);
  const [badges, setBadges] = useState<Badge[]>(DEFAULT_BADGES);
  const [quizzes, setQuizzes] = useState<any[]>(DEFAULT_QUIZZES);
  
  // Quiz Active State
  const [selectedQuizId, setSelectedQuizId] = useState<string>("space-odyssey");
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [checkingAnswer, setCheckingAnswer] = useState<boolean>(false);
  const [hasCheckedCurrent, setHasCheckedCurrent] = useState<boolean>(false);
  
  // Feedback states
  const [isCorrectFeedback, setIsCorrectFeedback] = useState<boolean | null>(null);
  const [streakHelpVisible, setStreakHelpVisible] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  
  // Results of active ongoing session
  const [activeAnswers, setActiveAnswers] = useState<Record<string, string>>({});
  const [activeScores, setActiveScores] = useState<Record<string, boolean>>({});

  // Audio mute helper
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Parent controls state
  const [parentPasswordOk, setParentPasswordOk] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  
  // Parents AI word generator form
  const [aiGrade, setAiGrade] = useState<string>("Grade 2");
  const [aiTheme, setAiTheme] = useState<string>("Magical Woods 🌲");
  const [aiCount, setAiCount] = useState<number>(6);
  const [generatingAi, setGeneratingAi] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<string>("");

  // Parents Custom word maker form
  const [customTitle, setCustomTitle] = useState<string>("");
  const [customWordsInput, setCustomWordsInput] = useState<string>("");
  const [enrichingWords, setEnrichingWords] = useState<boolean>(false);
  const [customGrade, setCustomGrade] = useState<string>("Grade 2");

  // Load state from local storage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("spell_student_name");
    if (storedName) setStudentName(storedName);

    const storedAvatar = localStorage.getItem("spell_student_avatar");
    if (storedAvatar) setStudentAvatar(storedAvatar);

    const storedStreak = localStorage.getItem("spell_student_streak");
    if (storedStreak) setStreak(Number(storedStreak));

    let finalSessions = [];
    const storedSessions = localStorage.getItem("spell_sessions");
    if (storedSessions) {
      try {
        finalSessions = JSON.parse(storedSessions);
        setSessions(finalSessions);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed typical mock historic tests so charts are beautiful out of the box!
      const mockPastSessions: QuizSession[] = [
        {
          id: "past-1",
          grade: "Grade 1",
          theme: "Warm-up Animals 🐸",
          words: [],
          answers: {},
          scores: { word1: true, word2: true, word3: false },
          completed: true,
          score: 2,
          total: 3,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "past-2",
          grade: "Grade 2",
          theme: "Household Fun 🏠",
          words: [],
          answers: {},
          scores: { table: true, chair: true, window: true, clean: true },
          completed: true,
          score: 4,
          total: 4,
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: "past-3",
          grade: "Grade 2",
          theme: "Yummy Fruits 🍉",
          words: [],
          answers: {},
          scores: { apple: true, banana: false, orange: true, grape: true },
          completed: true,
          score: 3,
          total: 4,
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      finalSessions = mockPastSessions;
      setSessions(mockPastSessions);
      localStorage.setItem("spell_sessions", JSON.stringify(mockPastSessions));
    }

    const storedXp = localStorage.getItem("spell_student_xp");
    if (storedXp) {
      setStudentXp(Number(storedXp));
    } else {
      // Seed dynamically matching saved mock inputs (9 correct * 10 = 90 XP + 7 streak * 15 = 195 XP) => 285 XP or similar
      const totalCorrect = finalSessions.reduce((acc, s) => acc + (s.score || 0), 0);
      const computedXp = Math.max(120, totalCorrect * 10 + 100);
      setStudentXp(computedXp);
      localStorage.setItem("spell_student_xp", String(computedXp));
    }

    const storedBadges = localStorage.getItem("spell_badges");
    if (storedBadges) {
      try {
        setBadges(JSON.parse(storedBadges));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed default badges as partially unlocked
      const partialBadges = [...DEFAULT_BADGES];
      partialBadges[1].unlocked = true; // Seed 3-day streak as done
      partialBadges[1].unlockedAt = new Date().toLocaleDateString();
      setBadges(partialBadges);
      localStorage.setItem("spell_badges", JSON.stringify(partialBadges));
    }

    const storedQuizzes = localStorage.getItem("spell_quizzes");
    if (storedQuizzes) {
      try {
        setQuizzes(JSON.parse(storedQuizzes));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const updateXp = (amount: number, reason?: string) => {
    setStudentXp((prev) => {
      const newVal = prev + amount;
      localStorage.setItem("spell_student_xp", String(newVal));
      return newVal;
    });
    setXpNotification(`+${amount} XP ${reason ? `(${reason})` : ""}`);
    setTimeout(() => {
      setXpNotification(null);
    }, 3000);
  };

  // Sync back to local storage
  const saveSessionsToLocalStorage = (newSessions: QuizSession[]) => {
    setSessions(newSessions);
    localStorage.setItem("spell_sessions", JSON.stringify(newSessions));
  };

  const saveBadgesToLocalStorage = (newBadges: Badge[]) => {
    setBadges(newBadges);
    localStorage.setItem("spell_badges", JSON.stringify(newBadges));
  };

  const saveQuizzesToLocalStorage = (newQuizzes: any[]) => {
    setQuizzes(newQuizzes);
    localStorage.setItem("spell_quizzes", JSON.stringify(newQuizzes));
  };

  const updateProfile = (name: string, avatar: string) => {
    setStudentName(name);
    setStudentAvatar(avatar);
    localStorage.setItem("spell_student_name", name);
    localStorage.setItem("spell_student_avatar", avatar);
    setIsEditingProfile(false);
  };

  // Helper Web Speech API TTS
  const speakText = (wordToPronounce: string, sentenceContext?: string) => {
    if (!audioEnabled) return;
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      synth.cancel(); // Stop talking instantly

      // Word utterance
      const wordUtterance = new SpeechSynthesisUtterance(wordToPronounce);
      wordUtterance.rate = audioSpeedRate; // Dynamic rate for young learners!
      wordUtterance.pitch = 1.15; // Sweet higher pitch
      
      // Select beautiful English voice if possible
      const voices = synth.getVoices();
      const friendlyVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Zira"))
      );
      if (friendlyVoice) {
        wordUtterance.voice = friendlyVoice;
      }

      synth.speak(wordUtterance);

      // Play contextual sentence after a small breather
      if (sentenceContext) {
        setTimeout(() => {
          const sentenceUtterance = new SpeechSynthesisUtterance(sentenceContext);
          sentenceUtterance.rate = audioSpeedRate + 0.13; // Slower or faster proportional sentence reading
          if (friendlyVoice) sentenceUtterance.voice = friendlyVoice;
          synth.speak(sentenceUtterance);
        }, 1300);
      }
    }
  };

  // Pronounce short reward or feedback sound wave using high-quality internal chemical AudioContext
  const playChime = (isSuccess: boolean) => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isSuccess) {
        // Cheerful double bell chime (Maj-3rd chord)
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else {
        // Soft low synth sound
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220.00, ctx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(146.83, ctx.currentTime + 0.3); // D3
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (e) {
      console.warn("AudioContext chime failed:", e);
    }
  };

  // Find currently active quiz definition
  const currentQuiz = quizzes.find((q) => q.id === selectedQuizId) || quizzes[0];
  const activeWord: SpellingWord | undefined = currentQuiz?.words?.[currentWordIndex];

  // Triggers when a test begins
  const handleStartQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setQuizMode(true);
    setCurrentWordIndex(0);
    setUserInput("");
    setHasCheckedCurrent(false);
    setIsCorrectFeedback(null);
    setShowHint(false);
    setActiveAnswers({});
    setActiveScores({});
    setActiveTab("practice");

    // Play first pronunciation after short delay
    const target = (quizzes.find((q) => q.id === quizId) || quizzes[0])?.words?.[0];
    if (target) {
      setTimeout(() => {
        speakText(target.word, "Listen to the word: " + target.word + ". " + target.sentence);
      }, 500);
    }
  };

  // Submits child answer for evaluation
  const handleCheckSpelling = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeWord) return;

    const trimmedInput = userInput.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanCorrect = activeWord.word.toLowerCase().replace(/[^a-z0-9]/g, "");

    const isCorrect = trimmedInput === cleanCorrect;
    
    // Save state
    const newAnswers = { ...activeAnswers, [activeWord.word]: userInput };
    const newScores = { ...activeScores, [activeWord.word]: isCorrect };
    setActiveAnswers(newAnswers);
    setActiveScores(newScores);

    setIsCorrectFeedback(isCorrect);
    setHasCheckedCurrent(true);
    playChime(isCorrect);

    // Speak spelling helper results
    if (isCorrect) {
      updateXp(10, "Correct Word!");
      speakText("Awesome spelling! You got it!");
    } else {
      speakText("Almost! It is spelled: " + activeWord.word.split("").join(" "));
    }
  };

  // Advance to next word or wrap up session
  const handleNextWord = () => {
    const nextIndex = currentWordIndex + 1;
    if (nextIndex < currentQuiz.words.length) {
      setCurrentWordIndex(nextIndex);
      setUserInput("");
      setHasCheckedCurrent(false);
      setIsCorrectFeedback(null);
      setShowHint(false);
      
      const nextWordObj = currentQuiz.words[nextIndex];
      // Talk
      speakText(nextWordObj.word, "The next word is: " + nextWordObj.word + ". " + nextWordObj.sentence);
    } else {
      // Completed spelling quiz session completely! Celebrate and persistent save
      const scoreCount = Object.values(activeScores).filter((v) => v === true).length;
      const totalCount = currentQuiz.words.length;
      const scorePercent = Math.round((scoreCount / totalCount) * 100);

      // Award completion & high score bonus XP!
      let completionXp = 20;
      if (scorePercent === 100) {
        completionXp += 30; // 50 XP total for flawless score
      }
      updateXp(completionXp, scorePercent === 100 ? "Flawless Quiz Bonus!" : "Quiz Completed!");

      // Check badge unlocks!
      let newlyUnlockedBadgeWord = "";
      const updatedBadges = badges.map((badge) => {
        let isUnlock = badge.unlocked;
        let reason = "";

        if (badge.id === "perfect" && scorePercent === 100) {
          isUnlock = true;
          reason = "flawless score";
        }
        if (badge.id === "space-master" && selectedQuizId === "space-odyssey" && scorePercent >= 60) {
          isUnlock = true;
          reason = "space list success";
        }
        if (badge.id === "animal-friend" && selectedQuizId === "animal-kingdom" && scorePercent >= 80) {
          isUnlock = true;
          reason = "animal helper master";
        }
        if (badge.id === "chef" && selectedQuizId === "cookie-kitchen" && scorePercent >= 80) {
          isUnlock = true;
          reason = "kitchen spelling chef";
        }
        if (badge.id === "parent-special" && currentQuiz.id.startsWith("custom-") && scorePercent >= 60) {
          isUnlock = true;
          reason = "parent special unlocked";
        }

        if (isUnlock && !badge.unlocked) {
          newlyUnlockedBadgeWord = badge.title;
          return { ...badge, unlocked: true, unlockedAt: new Date().toLocaleDateString() };
        }
        return badge;
      });

      if (newlyUnlockedBadgeWord) {
        saveBadgesToLocalStorage(updatedBadges);
        speakText("Congratulations! You earned the " + newlyUnlockedBadgeWord + " badge!");
      }

      // Add actual session state record
      const newSession: QuizSession = {
        id: "session-" + Date.now(),
        grade: currentQuiz.grade,
        theme: currentQuiz.theme,
        words: currentQuiz.words,
        answers: activeAnswers,
        scores: activeScores,
        completed: true,
        score: scoreCount,
        total: totalCount,
        unlockedBadge: newlyUnlockedBadgeWord || undefined,
        date: new Date().toISOString()
      };

      const updatedSessions = [newSession, ...sessions];
      saveSessionsToLocalStorage(updatedSessions);

      // Boost streak if practiced today
      const todayString = new Date().toDateString();
      const lastActiveDay = localStorage.getItem("spell_last_active");
      if (lastActiveDay !== todayString) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem("spell_student_streak", String(newStreak));
        localStorage.setItem("spell_last_active", todayString);
      }

      setQuizMode(false);
      setCompletedQuizState(newSession);
    }
  };

  // Post-quiz state screen
  const [completedQuizState, setCompletedQuizState] = useState<QuizSession | null>(null);

  // Parent zone access security check
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === "1234") {
      setParentPasswordOk(true);
      setPinError("");
    } else {
      setPinError("Oops! That's not the correct parent PIN code. Try '1234'!");
      playChime(false);
    }
  };

  const handleExitParentLab = () => {
    setParentPasswordOk(false);
    setEnteredPin("");
  };

  // Parent Command: Ask SpellBuddy Gemini AI to generate customized vocabulary list
  const handleGenerateAiList = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingAi(true);
    setAiFeedback("Magic cloud is spinning your words...");

    try {
      const response = await fetch("/api/spelling/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: aiGrade,
          theme: aiTheme,
          count: aiCount
        })
      });
      const data = await response.json();
      if (data.success && data.list && Array.isArray(data.list) && data.list.length > 0) {
        // Form a new Quiz list
        const generatedListId = "ai-" + Date.now();
        const newQuiz = {
          id: generatedListId,
          theme: aiTheme,
          grade: aiGrade,
          description: `Playful vocabulary powered by AI!`,
          words: data.list
        };

        const updatedQuizzes = [newQuiz, ...quizzes];
        saveQuizzesToLocalStorage(updatedQuizzes);
        setSelectedQuizId(generatedListId);
        
        setAiFeedback(`✨ Success! Ready for your child.`);
        setTimeout(() => {
          setAiFeedback("");
        }, 4000);
      } else {
        throw new Error(data.error || "Unable to get dynamic spelling list.");
      }
    } catch (err: any) {
      console.error(err);
      setAiFeedback("API note: Set up your secrets. Using standard child-safe default lists local backup.");
    } finally {
      setGeneratingAi(false);
    }
  };

  // Parent Command: Enrich parents manual comma-separated words with Gemini
  const handleEnrichManualWords = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWordsInput.trim()) return;

    const parsedArray = customWordsInput
      .split(",")
      .map((w) => w.trim().toLowerCase())
      .filter((w) => w.length > 1);

    if (parsedArray.length === 0) return;

    setEnrichingWords(true);
    const titleToUse = customTitle.trim() || `${studentName}'s Special Homework`;

    try {
      const response = await fetch("/api/spelling/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: customGrade,
          words: parsedArray
        })
      });
      const data = await response.json();

      if (data.success && data.list && Array.isArray(data.list)) {
        const enrichedQuizId = "custom-" + Date.now();
        const customQuiz = {
          id: enrichedQuizId,
          theme: `${titleToUse} 👑`,
          grade: customGrade,
          description: `Custom school list for our spelling quiz`,
          words: data.list
        };
        
        const updated = [customQuiz, ...quizzes];
        saveQuizzesToLocalStorage(updated);
        setSelectedQuizId(enrichedQuizId);
        setCustomWordsInput("");
        setCustomTitle("");
        
        speakText("Homework list successfully enriched!");
      } else {
        throw new Error("No payload returned.");
      }
    } catch (err) {
      console.error("Enrich failed, falling back to local fallback generator", err);
      // Fallback: generate basic placeholder values locally to continue offline seamlessly!
      const fallbackList = parsedArray.map((word) => ({
        word,
        phonetics: word.split("").join("-"),
        definition: "A custom spelling word chosen for you to master!",
        sentence: `Let's spell the word correctly: ${word}.`,
        clue: "Your parent manually added this spelling challenge!"
      }));

      const enrichedQuizId = "custom-fallback-" + Date.now();
      const customQuiz = {
        id: enrichedQuizId,
        theme: `${titleToUse} 🗂️`,
        grade: customGrade,
        description: `Custom spelling challenge list`,
        words: fallbackList
      };

      const updated = [customQuiz, ...quizzes];
      saveQuizzesToLocalStorage(updated);
      setSelectedQuizId(enrichedQuizId);
      setCustomWordsInput("");
      setCustomTitle("");
    } finally {
      setEnrichingWords(false);
    }
  };

  const handleDeleteQuiz = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = quizzes.filter((q) => q.id !== id);
    saveQuizzesToLocalStorage(updated);
    if (selectedQuizId === id) {
      setSelectedQuizId(updated[0]?.id || "space-odyssey");
    }
  };

  // Math helper stats
  const totalWordsSpelledCorrectly = sessions.reduce((acc, s) => acc + s.score, 0);
  const totalWordsTestedAll = sessions.reduce((acc, s) => acc + s.total, 0);
  const correctPercentOverall = totalWordsTestedAll > 0 
    ? Math.round((totalWordsSpelledCorrectly / totalWordsTestedAll) * 100) 
    : 0;

  // Dynamic kid classroom leaderboard
  const baseCompetitors = [
    { name: "Ava 🦄", points: 450, isUser: false },
    { name: "Oliver 🦖", points: 380, isUser: false },
    { name: "Chloe 🐼", points: 290, isUser: false },
    { name: "Ethan 🦊", points: 210, isUser: false },
    { name: "Mia 🦉", points: 120, isUser: false }
  ];

  const leaderboard = [
    ...baseCompetitors,
    { name: `${studentName} ${studentAvatar} (You)`, points: studentXp, isUser: true }
  ].sort((a, b) => b.points - a.points);

  // Track misspelled words for targeted practice
  const misspelledWordsSet = new Set<string>();
  const correctWordsSet = new Set<string>();
  sessions.forEach((s) => {
    Object.entries(s.scores).forEach(([w, correct]) => {
      if (correct) {
        correctWordsSet.add(w);
      } else {
        misspelledWordsSet.add(w);
      }
    });
  });
  // Filter out those subsequently corrected!
  const hardWords = Array.from(misspelledWordsSet).filter((w) => !correctWordsSet.has(w));

  // Build targeted review session from mistakes
  const handleStartReviewSession = () => {
    if (hardWords.length === 0) return;
    
    // Find info from existing quizzes if possible
    const reviewWords: SpellingWord[] = hardWords.map((word) => {
      // Look up definition
      let found: SpellingWord | undefined;
      for (const q of quizzes) {
        const match = q.words.find((w: SpellingWord) => w.word === word);
        if (match) {
          found = match;
          break;
        }
      }
      return found || {
        word,
        phonetics: "re-view",
        definition: "A word we had a little spelling slip-up on. Let's practice it!",
        sentence: `Can you spell ${word}? Let's nail it this time!`,
        clue: "Practice makes perfect!"
      };
    });

    const reviewQuizId = "review-mistakes";
    const reviewQuiz = {
      id: reviewQuizId,
      theme: "Review Challenge 🎯",
      grade: "Special Focus",
      description: "Custom practice tailored especially for your revision keys",
      words: reviewWords
    };

    // Temporarily inject and start!
    const filteredQuizzes = quizzes.filter((q) => q.id !== reviewQuizId);
    setQuizzes([reviewQuiz, ...filteredQuizzes]);
    handleStartQuiz(reviewQuizId);
  };

  const handleResetApplicationData = () => {
    localStorage.clear();
    setStudentName("Leo");
    setStudentAvatar("🦁");
    setStreak(3);
    setSessions([]);
    setBadges(DEFAULT_BADGES);
    setQuizzes(DEFAULT_QUIZZES);
    setSelectedQuizId("space-odyssey");
    setQuizMode(false);
    setCompletedQuizState(null);
    setActiveTab("dashboard");
    speakText("Application has been reset to defaults!");
  };

  return (
    <div id="spell-app-container" className="flex min-h-screen bg-[#FFFBEB] font-sans text-gray-800 antialiased overflow-x-hidden">
      
      {/* ==========================================
          SIDEBAR NAVIGATION
          ========================================== */}
      <aside id="sidebar-panel" className="w-[240px] shrink-0 bg-white border-r-2 border-yellow-100 p-6 flex flex-col justify-between hidden md:flex transition-all duration-300">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-md animate-bounce cute-bounce">
              <Sparkles className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-yellow-600">SpellBuddy</span>
          </div>

          {/* Child Profile Box */}
          <div className="mb-6 p-3 bg-yellow-50 rounded-2xl border border-yellow-100 flex items-center gap-3 relative group">
            {isEditingProfile ? (
              <div className="space-y-2 w-full">
                <input
                  type="text"
                  maxLength={12}
                  className="w-full text-xs font-bold p-1 bg-white border-2 border-yellow-300 rounded-lg text-gray-800"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onBlur={() => updateProfile(studentName, studentAvatar)}
                  onKeyDown={(e) => e.key === "Enter" && updateProfile(studentName, studentAvatar)}
                  autoFocus
                />
                <div className="flex gap-2 text-xs">
                  {["🦁", "🐼", "🦖", "🦊", "🦄", "🦉"].map((av) => (
                    <button
                      key={av}
                      onClick={() => {
                        updateProfile(studentName, av);
                      }}
                      className={`cursor-pointer text-lg hover:scale-125 transition-transform ${studentAvatar === av ? "bg-white p-0.5 rounded shadow-sm border border-yellow-300" : ""}`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <span className="text-3xl">{studentAvatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-yellow-500 uppercase tracking-widest">Active Kid</p>
                  <p className="text-sm font-bold text-gray-700 truncate">{studentName}</p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-[10px] uppercase font-bold text-yellow-600 hover:underline hover:text-yellow-700"
                >
                  Edit
                </button>
              </>
            )}
          </div>

          {/* Tab Links */}
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setQuizMode(false);
                setCompletedQuizState(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-left ${
                activeTab === "dashboard"
                  ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-200 shadow-sm"
                  : "text-gray-500 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
              Dashboard
            </button>
            <button
              onClick={() => handleStartQuiz(selectedQuizId)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-left ${
                activeTab === "practice"
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-200 shadow-sm"
                  : "text-gray-500 hover:text-blue-500 hover:bg-blue-50"
              }`}
            >
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
              Quiz Zone
            </button>
            <button
              onClick={() => {
                setActiveTab("rewards");
                setQuizMode(false);
                setCompletedQuizState(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-left ${
                activeTab === "rewards"
                  ? "bg-orange-100 text-orange-700 border-2 border-orange-200 shadow-sm"
                  : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Trophy className="w-5 h-5 stroke-[2.5]" />
              Rewards
            </button>
            <button
              onClick={() => {
                setActiveTab("parents");
                setQuizMode(false);
                setCompletedQuizState(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-left ${
                activeTab === "parents"
                  ? "bg-purple-100 text-purple-700 border-2 border-purple-200 shadow-sm"
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Users className="w-5 h-5 stroke-[2.5]" />
              Parents Lab
            </button>
          </nav>
        </div>

        {/* Sync Status / Mute */}
        <div className="space-y-3">
          <div className="p-4 bg-purple-50 rounded-2xl border-2 border-purple-100">
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">Parents Area</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-black text-purple-700 uppercase tracking-wide">Sync Live AI</span>
            </div>
            <button
              onClick={() => {
                setActiveTab("parents");
              }}
              className="w-full py-1.5 cursor-pointer bg-white text-purple-600 text-xs font-bold rounded-lg border border-purple-200 shadow-sm uppercase tracking-wide hover:bg-purple-100 transition-colors"
            >
              Configure Quiz
            </button>
          </div>

          {/* Sound Trigger */}
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 cursor-pointer"
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-500" />
                Cheerful Sounds On
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-red-500" />
                Sounds Muted
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ==========================================
          MOBILE BOTTOM NAVIGATION TAB BAR
          ========================================== */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t-2 border-yellow-100 flex md:hidden items-center justify-around z-40 px-2 shadow-lg">
        <button
          onClick={() => {
            setActiveTab("dashboard");
            setQuizMode(false);
            setCompletedQuizState(null);
          }}
          className={`flex flex-col items-center gap-0.5 text-xs font-black ${activeTab === "dashboard" ? "text-yellow-600" : "text-gray-400"}`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => handleStartQuiz(selectedQuizId)}
          className={`flex flex-col items-center gap-0.5 text-xs font-black ${activeTab === "practice" ? "text-blue-600" : "text-gray-400"}`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Practice</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("rewards");
            setQuizMode(false);
            setCompletedQuizState(null);
          }}
          className={`flex flex-col items-center gap-0.5 text-xs font-black ${activeTab === "rewards" ? "text-orange-600" : "text-gray-400"}`}
        >
          <Trophy className="w-5 h-5" />
          <span>Rewards</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("parents");
            setQuizMode(false);
            setCompletedQuizState(null);
          }}
          className={`flex flex-col items-center gap-0.5 text-xs font-black ${activeTab === "parents" ? "text-purple-600" : "text-gray-400"}`}
        >
          <Users className="w-5 h-5" />
          <span>Parents</span>
        </button>
      </div>

      {/* ==========================================
          MAIN WORKSPACE
          ========================================== */}
      <main className="flex-1 p-4 md:p-8 flex flex-col gap-6 max-w-6xl mx-auto w-full pb-20 md:pb-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2 border-b border-yellow-100 relative">
          {/* Real-time flying float announcement bubbles */}
          {xpNotification && (
            <div className="absolute top-0 right-0 sm:-top-4 sm:right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold px-4 py-2 rounded-2xl shadow-xl border-2 border-yellow-300 flex items-center gap-2 z-50 animate-bounce text-xs">
              <span className="text-base">✨</span> {xpNotification}
            </div>
          )}

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Welcome back, {studentName}! {studentAvatar}👋
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Ready to learn and spell? You've earned {totalWordsSpelledCorrectly} stars today!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Adorable real-time XP Counter Badge */}
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-yellow-950 font-black text-xs px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-sm border border-yellow-200/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
              <span className="text-base select-none">⭐</span>
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-wider text-yellow-900 leading-none">Spelling XP</p>
                <p className="text-sm font-black mt-0.5 leading-none">{studentXp} XP</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mastery level</p>
              <p className="text-sm font-extrabold text-orange-500 uppercase">
                {correctPercentOverall > 0 ? `${correctPercentOverall}% Perfect` : "Starting Journey"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-xl cursor-pointer hover:rotate-12 transition-transform">
              {studentAvatar}
            </div>
          </div>
        </header>

        {/* ACTION: COMPLETE POPUP SCREEN */}
        {completedQuizState && (
          <div className="bg-emerald-500 text-white p-6 md:p-8 rounded-[32px] border-b-8 border-emerald-700 shadow-xl flex flex-col items-center text-center relative overflow-hidden animate-fade-in">
            <div className="absolute right-4 bottom-4 text-9xl opacity-10">🏆</div>
            <div className="absolute left-4 top-4 text-6xl opacity-15">⭐</div>

            <span className="text-5xl font-black mb-3">💯 SPELLING SUCCESS!</span>
            <p className="text-emerald-100 text-base max-w-md mx-auto mb-6">
              Terrific work, {studentName}! You correctly spelled <strong className="text-white text-xl">{completedQuizState.score}</strong> out of{" "}
              <strong>{completedQuizState.total}</strong> words in the <span className="underline">{completedQuizState.theme}</span> list!
            </p>

            {/* Performance Bar */}
            <div className="w-full max-w-sm h-4 bg-emerald-700/50 rounded-full mb-6 overflow-hidden p-0.5">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${(completedQuizState.score / completedQuizState.total) * 100}%` }}
              ></div>
            </div>

            {completedQuizState.unlockedBadge && (
              <div className="bg-white/20 px-6 py-3 rounded-2xl mb-6 border border-white/30 backdrop-blur-sm flex items-center gap-3">
                <span className="text-3xl animate-bounce">🎁</span>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-yellow-300">Unlocked Badge!</p>
                  <p className="font-extrabold text-lg text-white">{completedQuizState.unlockedBadge}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCompletedQuizState(null);
                  setActiveTab("dashboard");
                }}
                className="px-6 py-3 bg-white text-emerald-700 font-extrabold rounded-2xl shadow-md hover:bg-emerald-50 transition-colors"
              >
                Go to Dashboard 👋
              </button>
              <button
                onClick={() => {
                  setCompletedQuizState(null);
                  handleStartQuiz(selectedQuizId);
                }}
                className="px-5 py-3 bg-emerald-600 text-white font-extrabold rounded-2xl border border-emerald-400 hover:bg-emerald-700 transition-colors"
              >
                Play Again 🔄
              </button>
            </div>
          </div>
        )}

        {/* 1. DASHBOARD VIEW: BENTO GRID TEMPLATE */}
        {activeTab === "dashboard" && !quizMode && !completedQuizState && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            
            {/* Bento Box: Large Card (Active Quiz Banner) */}
            <div className="col-span-1 md:col-span-3 bg-blue-500 rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between border-b-8 border-blue-700 shadow-lg min-h-[220px]">
              <div className="relative z-10">
                <span className="px-3.5 py-1 bg-blue-400/80 rounded-full text-xs font-black uppercase tracking-widest border border-blue-300/30">
                  Ready Spelling Quest
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-2 tracking-tight">
                  {currentQuiz?.theme || "Space Odyssey 🚀"}
                </h2>
                <p className="text-blue-100 font-medium text-sm opacity-90 max-w-md">
                  Difficulty: {currentQuiz?.grade || "Grade 2"} • Contains {currentQuiz?.words?.length || 0} vocabulary spellkeys
                </p>
                <p className="text-xs text-blue-200 mt-2 italic bg-blue-600/30 inline-block px-3 py-1 rounded-xl">
                  "{currentQuiz?.description}"
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 mt-6 pt-4 border-t border-blue-400/30">
                <button
                  onClick={() => handleStartQuiz(currentQuiz.id)}
                  className="px-8 py-3.5 bg-white text-blue-600 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
                >
                  Start Spelling Test! 🔊
                </button>
                <div className="flex-1">
                  <p className="text-[10px] uppercase font-black tracking-widest text-blue-200 mb-1">Weekly completion</p>
                  <div className="h-3 bg-blue-600 rounded-full overflow-hidden p-0.5 border border-blue-400/30">
                    <div className="h-full bg-yellow-300 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>

              {/* Space graphics */}
              <div className="absolute -right-8 -top-8 w-44 h-44 bg-blue-400 rounded-full opacity-20 pointer-events-none"></div>
              <div className="absolute right-8 bottom-6 text-7xl md:text-8xl opacity-20 animate-pulse pointer-events-none">🚀</div>
            </div>

            {/* Bento Box: Red/Orange Streak Card */}
            <div className="col-span-1 bg-orange-400 rounded-[32px] p-6 text-white flex flex-col items-center justify-center text-center border-b-8 border-orange-600 shadow-md relative overflow-hidden">
              <div className="text-5xl mb-2 hover:scale-125 transition-transform cursor-pointer" onClick={() => setStreakHelpVisible(!streakHelpVisible)}>🔥</div>
              <h3 className="text-5xl font-black tracking-tight">{streak}</h3>
              <p className="text-sm font-black uppercase tracking-widest text-orange-100">Day Active Streak!</p>

              {/* Progress dots */}
              <div className="mt-5 grid grid-cols-7 gap-1.5 w-full">
                {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => (
                  <div
                    key={dayNum}
                    className={`h-2.5 rounded-full ${dayNum <= (streak % 7 || 7) ? "bg-white" : "bg-white/30"}`}
                    title={dayNum <= (streak % 7 || 7) ? "Active!" : "Upcoming"}
                  ></div>
                ))}
              </div>
              <p className="text-[9px] text-orange-200 mt-2 font-medium">Keep practicing daily for custom crowns!</p>

              {streakHelpVisible && (
                <div className="absolute inset-0 bg-orange-500/95 p-4 flex flex-col justify-center items-center text-xs text-white">
                  <p className="font-bold mb-2">💡 Daily Streaks</p>
                  <p className="leading-relaxed">Earn +1 streak count every day you practice. Keep the fire burning to unlock custom character avatars!</p>
                  <button onClick={() => setStreakHelpVisible(false)} className="mt-3 px-3 py-1 bg-white text-orange-600 uppercase font-bold rounded-lg text-[10px]">Awesome</button>
                </div>
              )}
            </div>

            {/* Bento Box: Emerald Badge Card */}
            <div className="col-span-1 bg-emerald-50 rounded-[32px] p-6 border-2 border-emerald-200 shadow-sm flex flex-col items-center justify-between text-center">
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Last Achievement</p>
                <div className="w-20 h-20 bg-white rounded-full border border-emerald-100 flex items-center justify-center shadow-inner mx-auto mb-2 group hover:rotate-12 transition-transform">
                  <span className="text-4xl">⭐</span>
                </div>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-emerald-800 leading-tight">Perfect Score!</h4>
                <p className="text-xs text-emerald-600 mt-1">Earned on Theme Space & Planets</p>
              </div>
              <button
                onClick={() => setActiveTab("rewards")}
                className="mt-3 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Vew all badges <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bento Box: Parent Summary Height Chart */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-6 border-2 border-yellow-100 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-extrabold text-gray-800 text-sm md:text-base tracking-tight">Parent Summary</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Average Spelling Accuracy</p>
                </div>
                <span className="text-[10px] font-extrabold text-white bg-purple-500 px-2 py-0.5 rounded-full uppercase">
                  ACTIVE FEEDBACK
                </span>
              </div>

              {/* Mini Height Chart */}
              <div className="h-28 flex items-end gap-2 px-1 border-b border-gray-100 pb-2">
                {[
                  { day: "Mon", height: "40%", score: "4/10", active: false },
                  { day: "Tue", height: "80%", score: "8/10", active: true },
                  { day: "Wed", height: "30%", score: "3/10", active: false },
                  { day: "Thu", height: "100%", score: "6/6", active: true },
                  { day: "Fri", height: "90%", score: "9/10", active: true },
                  { day: "Sat", height: "0%", score: "0/0", active: false },
                  { day: "Sun", height: "100%", score: "2/2", active: true }
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer">
                    <div className="absolute bottom-full mb-1 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                      Score: {bar.score} Accuracy
                    </div>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        bar.active ? "bg-emerald-400 group-hover:bg-emerald-500 shadow-sm" : "bg-gray-100 group-hover:bg-gray-200"
                      }`}
                      style={{ height: bar.height }}
                    ></div>
                    <span className="text-[9px] font-bold text-gray-400 mt-1.5">{bar.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-xs mt-3">
                <span className="text-gray-400 font-medium">Weekly Total: <strong>{totalWordsSpelledCorrectly} correct inputs</strong></span>
                <button onClick={() => setActiveTab("parents")} className="text-purple-600 font-black hover:underline">
                  Analyze Stats →
                </button>
              </div>
            </div>

            {/* Bento Box: Classroom Leaderboard */}
            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[32px] p-6 border-2 border-amber-200 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-base tracking-tight flex items-center gap-1.5">
                      Class Leaderboard <Trophy className="w-5 h-5 text-amber-500 stroke-[2.5] animate-bounce" />
                    </h4>
                    <p className="text-[10px] text-amber-600 font-bold uppercase">Weekly Spelling Stars</p>
                  </div>
                  <span className="text-[10px] font-extrabold text-white bg-amber-500 px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Rank {leaderboard.findIndex(p => p.isUser) + 1} of {leaderboard.length}
                  </span>
                </div>

                {/* Leaderboard Competitors list */}
                <div className="space-y-2">
                  {leaderboard.map((item, index) => {
                    const isCurrentUser = item.isUser;
                    let medalEmoji = "";
                    if (index === 0) medalEmoji = "🥇";
                    else if (index === 1) medalEmoji = "🥈";
                    else if (index === 2) medalEmoji = "🥉";
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                          isCurrentUser
                            ? "bg-amber-100 border border-amber-300 font-black scale-102 shadow-sm"
                            : "bg-white border border-amber-100/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-black text-amber-600 w-5 text-center">
                            {medalEmoji || `${index + 1}`}
                          </span>
                          <span className="text-xs font-bold text-gray-700 truncate">{item.name}</span>
                        </div>
                        <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100 flex items-center gap-0.5 shrink-0">
                          {item.points} <span className="text-[9px] text-amber-600 font-bold">XP</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center text-[10px] text-amber-600 mt-4 font-bold uppercase tracking-wide">
                <span>Earn +10 XP per word to climb! 🚀</span>
              </div>
            </div>

            {/* Bento Box: Purple Upcoming Test reminder */}
            <div className="col-span-1 bg-purple-500 rounded-[32px] p-6 text-white border-b-8 border-purple-700 shadow-md flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-lg tracking-tight mb-2">School Spelling HW</h4>
                <div className="flex items-center gap-2 bg-purple-600/50 p-2.5 rounded-2xl border border-purple-400/20">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="text-[9px] font-bold text-purple-200 uppercase">Parent Schedule</p>
                    <p className="text-sm font-black text-white">This Friday Night</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    setActiveTab("parents");
                  }}
                  className="w-full py-2 bg-white text-purple-600 font-extrabold rounded-xl text-xs shadow-md hover:bg-purple-50 transition-colors"
                >
                  Create Custom Quiz
                </button>
                <p className="text-[9px] text-purple-200 text-center mt-1.5">Configure lists manually inside lab</p>
              </div>
            </div>

            {/* Bento Box: New Card! Weakness Focus Words */}
            <div className="col-span-1 md:col-span-4 bg-white rounded-[32px] p-5 border-2 border-yellow-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                  <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-black text-gray-800 tracking-tight text-sm md:text-base">Targeted Revision Zone 🎯</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {hardWords.length > 0 
                      ? `We found ${hardWords.length} words Leo missed recently. Want a quick focus test?`
                      : "Awesome job! You have no misspelled words currently. Pure perfection!"}
                  </p>
                  {hardWords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {hardWords.map((word) => (
                        <button
                          key={word}
                          type="button"
                          onClick={() => {
                            speakText(word, `Let's practice spelling: ${word}`);
                            updateXp(1, "Revision Practice");
                          }}
                          className="px-2.5 py-0.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full font-bold text-xs uppercase border border-orange-100 cursor-pointer transition-all flex items-baseline gap-1 active:scale-95"
                          title="Click to hear word pronunciation!"
                        >
                          <span>{word}</span>
                          <span className="text-[10px] opacity-75">🔊</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                {hardWords.length > 0 ? (
                  <button
                    onClick={handleStartReviewSession}
                    className="px-5 py-2.5 bg-orange-500 text-white font-extrabold rounded-xl text-xs hover:bg-orange-600 shadow-md transition-all whitespace-nowrap cursor-pointer"
                  >
                    Start Revision Practice! 🗣️
                  </button>
                ) : (
                  <div className="text-emerald-500 font-extrabold text-xs flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <CheckCircle className="w-4 h-4" /> Flawless Record!
                  </div>
                )}
              </div>
            </div>

            {/* Bento Box: Selection list of all spelling themes */}
            <div className="col-span-1 md:col-span-4 bg-yellow-50 rounded-[32px] p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-extrabold text-yellow-800 tracking-tight mb-4 flex items-center gap-2">
                📂 Choose Your Theme Playbook
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {quizzes.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => {
                      setSelectedQuizId(q.id);
                      handleStartQuiz(q.id);
                    }}
                    className={`p-4 bg-white rounded-2xl border-2 transition-all cursor-pointer group hover:shadow-md ${
                      selectedQuizId === q.id ? "border-yellow-400 bg-yellow-50/50 ring-2 ring-yellow-300" : "border-yellow-100 hover:border-yellow-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-extrabold uppercase text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
                        {q.grade}
                      </span>
                      {q.id.startsWith("custom") || q.id.startsWith("ai") ? (
                        <button
                          onClick={(e) => handleDeleteQuiz(q.id, e)}
                          title="Delete custom spelling list"
                          className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : null}
                    </div>
                    <h4 className="font-extrabold text-gray-800 text-base mt-2 group-hover:text-yellow-700">
                      {q.theme}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">{q.words.length} Vocabulary Words</p>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 font-bold mt-3">
                      <span>Begin now</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. PRACTICE ZONE SCREENS (Spelling Administered Test Flow) */}
        {activeTab === "practice" && quizMode && (
          <div id="quiz-workspace" className="max-w-2xl mx-auto w-full">
            
            {/* Header progress info */}
            <div className="bg-white rounded-[32px] p-6 border-2 border-blue-200 shadow-md mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-blue-600 text-sm md:text-base">
                    Theme: {currentQuiz.theme}
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full">
                    {currentQuiz.grade}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setQuizMode(false);
                    setActiveTab("dashboard");
                  }}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 px-2 py-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Exit Quiz 🏃
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-gray-500 whitespace-nowrap">
                  Word {currentWordIndex + 1} of {currentQuiz.words.length}
                </span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full p-0.5 border">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentWordIndex + 1) / currentQuiz.words.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Core word challenge spelling form */}
            {activeWord ? (
              <div className="bg-white rounded-[32px] p-6 md:p-8 border-4 border-blue-300 shadow-lg text-center relative overflow-hidden">
                <div className="absolute right-4 top-4 bg-yellow-400 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-sm animate-pulse">
                  ⭐ +10 Points Key
                </div>
                
                {/* Visual Avatar / Speaker button */}
                <div className="mb-6 flex flex-col items-center">
                  <div
                    onClick={() => speakText(activeWord.word, activeWord.sentence)}
                    className="w-24 h-24 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-all text-4xl group relative"
                    title="Click to speak word out loud!"
                  >
                    <span className="group-hover:scale-95 transition-transform">🔊</span>
                    <div className="absolute -bottom-2 bg-yellow-400 text-gray-900 border border-yellow-500 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap shadow">
                      Tap Teacher Voice
                    </div>
                  </div>

                  {/* Speech Rate Controls */}
                  <div className="mt-5 flex gap-1.5 justify-center items-center bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-extrabold uppercase text-gray-400 mr-1 shrink-0">Voice Speed:</span>
                    <button
                      type="button"
                      onClick={() => { setAudioSpeedRate(0.5); speakText(activeWord.word, "Slow speed set"); }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${audioSpeedRate === 0.5 ? "bg-amber-400 text-yellow-950 shadow-xs border border-amber-300" : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-150"}`}
                      title="Slow speak rate"
                    >
                      🐢 Slow
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAudioSpeedRate(0.75); speakText(activeWord.word, "Normal speed set"); }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${audioSpeedRate === 0.75 ? "bg-amber-400 text-yellow-950 shadow-xs border border-amber-300" : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-150"}`}
                      title="Moderate friendly speak rate"
                    >
                      🦁 Medium
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAudioSpeedRate(1.0); speakText(activeWord.word, "Quick speed set"); }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${audioSpeedRate === 1.0 ? "bg-amber-400 text-yellow-950 shadow-xs border border-amber-300" : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-150"}`}
                      title="Standard speech rate"
                    >
                      🚀 Fast
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-400 font-bold uppercase mt-4">Pronunciation Helpers</p>
                  <p id="spelling-phonetics" className="text-xl font-black text-blue-700 tracking-wider bg-blue-50 px-4 py-1.5 rounded-2xl border border-blue-100 mt-1">
                    {activeWord.phonetics}
                  </p>
                </div>

                {/* Question Details Block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
                  {/* Child-friendly Word Illustration */}
                  <div className="bg-sky-50 p-3 rounded-3xl border border-sky-100 flex flex-col items-center justify-center">
                    <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-xs border-2 border-white bg-white/50 flex items-center justify-center">
                      <img
                        src={getWordImage(activeWord.word)}
                        alt={`Illustration for ${activeWord.word}`}
                        className="w-full h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-sky-600 mt-2">✨ Picture Clue Helper</span>
                  </div>

                  <div className="bg-yellow-50/50 border border-yellow-200/60 p-4 rounded-3xl text-left flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-black uppercase text-yellow-600 mb-1">🎁 Word Clue Helpers</p>
                      <p className="font-bold text-gray-700 text-sm">
                        "{activeWord.clue}"
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">💡 Child Dictionary</p>
                      <p className="text-xs text-gray-650 leading-relaxed font-semibold">
                        {activeWord.definition}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Playful Interactive Input field */}
                <form onSubmit={handleCheckSpelling} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="text-xs uppercase font-black tracking-widest text-gray-400 block mb-1">
                      Type spelling answer below:
                    </label>
                    <input
                      type="text"
                      className={`w-full text-center text-2xl tracking-widest font-black uppercase py-3 px-4 rounded-2xl focus:outline-none border-4 focus:ring-4 transition-all ${
                        isCorrectFeedback === true
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800 focus:ring-emerald-200"
                          : isCorrectFeedback === false
                          ? "border-red-400 bg-red-50 text-red-800 focus:ring-red-200"
                          : "border-blue-300 bg-blue-50/30 text-gray-800 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                      placeholder="ENTER WORD..."
                      disabled={hasCheckedCurrent}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      maxLength={20}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                  </div>

                  {/* Helpers: Letter Count indicators to fit age needs perfectly */}
                  <div className="flex justify-center gap-1">
                    {activeWord.word.split("").map((letter, idx) => {
                      const typedLetter = userInput[idx];
                      return (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center font-bold text-sm ${
                            typedLetter 
                              ? "bg-blue-50 border-blue-300 text-blue-700" 
                              : "bg-gray-50 border-gray-200 text-transparent"
                          }`}
                        >
                          {showHint ? letter : typedLetter || "_"}
                        </div>
                      );
                    })}
                  </div>

                  {/* Sound Assist Helper Controls */}
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="px-3.5 py-1.5 bg-yellow-400 text-white font-extrabold text-[11px] uppercase tracking-wide rounded-xl shadow-sm hover:bg-yellow-500 transition-colors"
                    >
                      {showHint ? "🫣 HIDE LETTERS" : "💡 SHOW HINT"}
                    </button>
                    <button
                      type="button"
                      onClick={() => speakText(activeWord.word, activeWord.sentence)}
                      className="px-3.5 py-1.5 bg-blue-400 text-white font-extrabold text-[11px] uppercase tracking-wide rounded-xl shadow-sm hover:bg-blue-500 transition-colors"
                    >
                      🔊 HEAR STORY SENTENCE
                    </button>
                  </div>

                  {/* Feedback response container */}
                  {hasCheckedCurrent && (
                    <div className={`p-4 rounded-2xl text-left border-2 animate-cute-swipe ${
                      isCorrectFeedback 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}>
                      <div className="flex font-black text-sm gap-2">
                        <span>{isCorrectFeedback ? "🌟 BEAUTIFUL WORK!" : "😿 ALMOST HAD IT!"}</span>
                      </div>
                      <p className="text-xs font-semibold mt-1">
                        {isCorrectFeedback 
                          ? `Splendid! You spelled "${activeWord.word}" perfectly. Let's head onwards!` 
                          : `The correct spelling is "${activeWord.word.toUpperCase()}". Your inputted try was: "${userInput}". Keep practicing!`}
                      </p>
                      
                      {/* Context narrative reader helper */}
                      <p className="text-[10px] text-gray-400 bg-white/70 p-1.5 rounded-lg border mt-2">
                        Sentence use: <strong>"{activeWord.sentence}"</strong>
                      </p>
                    </div>
                  )}

                  {/* Action Commands Buttons */}
                  <div className="pt-2">
                    {!hasCheckedCurrent ? (
                      <button
                        type="submit"
                        disabled={!userInput.trim()}
                        className="w-full py-4 cursor-pointer bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-black text-xl rounded-2xl shadow-md transition-all active:scale-95 uppercase tracking-wide"
                      >
                        Check Spelling! 🎯
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextWord}
                        className="w-full py-4 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl shadow-md transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2"
                      >
                        {currentWordIndex + 1 === currentQuiz.words.length ? "Finish Test! 🏆" : "Next Spelling Word ⭐"}
                      </button>
                    )}
                  </div>
                </form>

              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-6 border-2 text-center text-gray-400">
                This list is empty. Pick a different theme helper dashboard!
              </div>
            )}
          </div>
        )}

        {/* 3. REWARDS SCREEN: THE INTERACTIVE BADGES SHELF */}
        {activeTab === "rewards" && !quizMode && (
          <div id="rewards-hall">
            <div className="text-center max-w-md mx-auto mb-8">
              <span className="text-5xl animate-bounce leading-none inline-block">🏆</span>
              <h2 className="text-3xl font-extrabold text-yellow-800 mt-2">Leo's Badge Showcase</h2>
              <p className="text-gray-500 text-sm font-medium mt-1">
                Unlock adorable character achievements by playing spelling quizzes successfully!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-5 rounded-[32px] border-2 flex flex-col items-center text-center transition-all min-h-[220px] justify-between relative group ${
                    b.unlocked
                      ? "bg-white border-yellow-200 hover:border-yellow-400 hover:shadow-lg hover:scale-105"
                      : "bg-gray-100/50 border-gray-200 text-gray-400 opacity-70"
                  }`}
                >
                  <div className="text-6xl my-2 select-none group-hover:scale-125 transition-transform duration-300">
                    {b.unlocked ? b.emoji : "🔒"}
                  </div>
                  <div>
                    <h4 className={`text-base font-extrabold ${b.unlocked ? "text-gray-800" : "text-gray-400"}`}>
                      {b.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium px-2 mt-1 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                  
                  {b.unlocked ? (
                    <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1 mt-3">
                      <Check className="w-3.5 h-3.5" /> Unlocked {b.unlockedAt}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase text-gray-400 mt-3 bg-gray-200/50 px-2.5 py-1 rounded-full">
                      Locked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PARENTS ZONE: AI WORD GENERATOR & COMPREHENSIVE CHILD ANALYTICS */}
        {activeTab === "parents" && !quizMode && (
          <div id="parents-dashboard-lab">
            
            {/* PIN SECURITY GATEWAY FOR KIDS */}
            {!parentPasswordOk ? (
              <div className="max-w-md mx-auto bg-white rounded-[32px] p-6 md:p-8 border-4 border-purple-200 shadow-md">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
                    🔒
                  </div>
                  <h3 className="text-xl font-black text-purple-800 uppercase tracking-wide">Enter Parent Gate</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">
                    To prevent young spelling children from changing configurations, please verify you are a parent.
                  </p>
                </div>

                <form onSubmit={handleVerifyPin} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase font-black text-gray-400 block mb-1 text-center">
                      Please type pincode "1234" to enter:
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      className="w-full text-center text-3xl font-black bg-purple-50 tracking-widest border-2 focus:border-purple-400 outline-none p-3 rounded-2xl text-purple-800"
                      value={enteredPin}
                      onChange={(e) => setEnteredPin(e.target.value)}
                      placeholder="••••"
                      autoFocus
                    />
                    {pinError && (
                      <p className="text-red-500 font-extrabold text-xs text-center mt-2 flex items-center justify-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {pinError}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-2xl shadow-sm text-sm uppercase cursor-pointer"
                  >
                    Unlock Parents Control 🪄
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Parents Hub Header Banner */}
                <div className="bg-purple-600 rounded-[32px] p-6 text-white border-b-8 border-purple-800 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👩‍🏫</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Parents Spelling Control Lab</h2>
                    </div>
                    <p className="text-purple-100 text-sm font-medium mt-1 max-w-xl leading-relaxed">
                      Utilize Gemini AI to generate customized age-appropriate theme spellchecks or input school spelling worksheets instantly to unlock voice support!
                    </p>
                  </div>
                  <button
                    onClick={handleExitParentLab}
                    className="px-5 py-2.5 bg-white text-purple-700 hover:bg-purple-50 rounded-xl font-extrabold text-xs shrink-0 self-end md:self-auto cursor-pointer"
                  >
                    Lock Parents Gate 🔒
                  </button>
                </div>

                {/* Grid controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Widget 1: Gemini AI Magic Creator */}
                  <div className="bg-white rounded-[32px] p-6 border-2 border-purple-100 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-lg text-purple-800 flex items-center gap-2 tracking-tight">
                      🪄 AI Magic Word List Generator
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                      Input children's grade and choose interactive parameters. Gemini will formulate standard words, playful sentences, correct spelling guides and phonetic definitions!
                    </p>

                    <form onSubmit={handleGenerateAiList} className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                            Target School Grade
                          </label>
                          <select
                            className="w-full text-xs font-bold p-2 bg-purple-50 rounded-xl border border-purple-200 outline-none text-purple-900"
                            value={aiGrade}
                            onChange={(e) => setAiGrade(e.target.value)}
                          >
                            <option value="Preschool">Preschool / Kindergarten</option>
                            <option value="Grade 1">Grade 1</option>
                            <option value="Grade 2">Grade 2</option>
                            <option value="Grade 3">Grade 3</option>
                            <option value="Grade 4">Grade 4</option>
                            <option value="Grade 5">Grade 5</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                            Number of Words
                          </label>
                          <select
                            className="w-full text-xs font-bold p-2 bg-purple-50 rounded-xl border border-purple-200 outline-none text-purple-900"
                            value={aiCount}
                            onChange={(e) => setAiCount(Number(e.target.value))}
                          >
                            <option value={5}>5 spelling keys</option>
                            <option value={8}>8 spelling keys</option>
                            <option value={10}>10 spelling keys</option>
                            <option value={12}>12 spelling keys</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                          Vocabulary Theme Description
                        </label>
                        <input
                          type="text"
                          className="w-full text-xs font-bold p-2.5 bg-purple-50 rounded-xl border border-purple-200 outline-none text-purple-900"
                          value={aiTheme}
                          onChange={(e) => setAiTheme(e.target.value)}
                          placeholder="e.g. Magic Wizards, Daily kitchen, Safari..."
                        />
                      </div>

                      {aiFeedback && (
                        <p className="p-2.5 bg-purple-50 text-purple-700 font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1 border border-purple-200">
                          <RotateCw className="w-4 h-4 animate-spin text-purple-500" /> {aiFeedback}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={generatingAi}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-200 text-white font-extrabold rounded-2xl text-xs uppercase shadow-sm cursor-pointer"
                      >
                        {generatingAi ? "Invoking Spelling Teacher..." : "Magic Generate with Gemini! 🚀"}
                      </button>
                    </form>
                  </div>

                  {/* Widget 2: Custom Homework Worksheet Loader */}
                  <div className="bg-white rounded-[32px] p-6 border-2 border-purple-100 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-lg text-purple-800 flex items-center gap-2 tracking-tight">
                      📝 Homework List Enrichment Maker
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                      Does your child have specific spelling worksheets from elementary school this week? Paste them comma-separated! SpellBuddy AI connects sentences and visualizes clues to make them exciting!
                    </p>

                    <form onSubmit={handleEnrichManualWords} className="space-y-3">
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                          Test custom Title
                        </label>
                        <input
                          type="text"
                          className="w-full text-xs font-bold p-2.5 bg-purple-50 rounded-xl border border-purple-200 outline-none text-purple-900"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          placeholder="e.g. Week 4 Homework, Mrs. Smith List..."
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                          Spelling Words (comma-separated list)
                        </label>
                        <textarea
                          rows={3}
                          className="w-full text-xs font-bold p-2.5 bg-purple-50 rounded-xl border border-purple-200 outline-none text-purple-900 resize-none"
                          value={customWordsInput}
                          onChange={(e) => setCustomWordsInput(e.target.value)}
                          placeholder="e.g. elephant, beautiful, tomorrow, castle..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={enrichingWords || !customWordsInput.trim()}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white font-extrabold rounded-2xl text-xs uppercase shadow-sm cursor-pointer"
                      >
                        {enrichingWords ? "Adding story context..." : "Enrich Custom spelling homework! 🪄"}
                      </button>
                    </form>
                  </div>

                  {/* Widget 3: Comprehensive Test Analytics and historic score log */}
                  <div className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-6 border-2 border-yellow-100 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <h3 className="font-extrabold text-yellow-800 text-base flex items-center gap-2 tracking-tight">
                        📈 Logged Student Test History
                      </h3>
                      <button
                        onClick={handleResetApplicationData}
                        className="text-[10px] uppercase font-black text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Wipe Reset App
                      </button>
                    </div>

                    {sessions.length === 0 ? (
                      <div className="text-center p-6 text-gray-400 text-xs">
                        No spelling quizzes taken yet! Start testing in the dashboard list.
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                        {sessions.map((sesh, sIndex) => (
                          <div key={sIndex} className="p-3.5 bg-yellow-50/50 rounded-2xl border border-yellow-100 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-black text-gray-800 text-sm">
                                {sesh.theme}
                              </p>
                              <p className="text-gray-400 font-bold uppercase text-[9px] mt-0.5">
                                Date Spelled: {new Date(sesh.date).toLocaleDateString()} @ {new Date(sesh.date).toLocaleTimeString()}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1 text-[10px]">
                                {Object.keys(sesh.scores).map((wordKey) => (
                                  <span
                                    key={wordKey}
                                    className={`px-1.5 py-0.5 rounded font-black ${
                                      sesh.scores[wordKey] ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {wordKey}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-gray-800">
                                {sesh.score} / {sesh.total} Correct
                              </span>
                              <p className="text-[10px] font-semibold text-emerald-600">
                                {Math.round((sesh.score / sesh.total) * 100)}% Grade accuracy
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}
