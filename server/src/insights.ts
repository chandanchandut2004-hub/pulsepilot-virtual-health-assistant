import dayjs from 'dayjs';

type Insight = { title: string; detail: string; action?: string };

export function deriveInsights(steps: number, calories: number, heartRate: number): Insight[] {
  const out: Insight[] = [];

  if (steps < 5000) {
    out.push({
      title: 'Low activity today',
      detail: `You've logged ${steps} steps. A 10–15 min walk can boost energy and mood.`,
      action: 'Take a brisk walk or do desk stretches.'
    });
  } else if (steps > 10000) {
    out.push({
      title: 'Great step count!',
      detail: `Over ${steps} steps — consider light mobility work to aid recovery.`,
      action: 'Try 5 minutes of calf and hip flexor stretches.'
    });
  }

  if (heartRate > 95) {
    out.push({
      title: 'Elevated heart rate',
      detail: `Recent HR ≈ ${heartRate} bpm. Hydration and breathing exercises may help.`,
      action: 'Sip water and try 2 minutes of box breathing (4-4-4-4).'
    });
  }

  out.push({
    title: 'Nutrition nudge',
    detail: `Calories ~ ${calories}. Aim for a balanced plate (protein, veg, carbs, healthy fats).`
  });

  return out;
}
