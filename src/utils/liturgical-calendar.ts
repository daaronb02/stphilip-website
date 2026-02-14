/**
 * Liturgical Calendar — Date-range-to-theme mapping
 *
 * Byzantine Catholic calendar using GREGORIAN dates.
 * Moveable feasts are hardcoded per year — update annually.
 *
 * DESIGN NOTE: `getCurrentThemeSlug()` is the single point of control.
 * When the future Google Calendar API integration replaces this logic,
 * only this function's internals change — nothing else in the site
 * needs to be modified.
 */

interface DateRange {
  slug: string;
  label: string;
  start: string; // MM-DD
  end: string;   // MM-DD
}

/**
 * MOVEABLE FEASTS FOR 2026 (Byzantine Catholic — Gregorian calendar)
 *
 * Pascha (Easter): April 12, 2026
 * Great Lent begins (Clean Monday): February 23, 2026
 * Palm Sunday: April 5, 2026
 * Bright Week ends: April 19, 2026
 * Ascension: May 21, 2026
 * Pentecost: May 31, 2026
 * Pentecost season ends (All Saints): June 7, 2026
 *
 * UPDATE THESE DATES EACH YEAR by recalculating from the Pascha date.
 * Great Lent = Pascha - 48 days
 * Palm Sunday = Pascha - 7 days
 * Bright Week = Pascha + 7 days
 * Ascension = Pascha + 39 days
 * Pentecost = Pascha + 49 days
 * All Saints = Pascha + 56 days
 */

// First-match-wins ordering — more specific ranges before general ones
const dateRanges: DateRange[] = [
  // === MOVEABLE FEASTS (update annually) ===

  // Great Lent (Clean Monday through Saturday before Palm Sunday)
  { slug: 'penitential', label: 'Great Lent',           start: '02-23', end: '04-04' },
  // Palm Sunday through Great Saturday
  { slug: 'penitential', label: 'Holy Week',            start: '04-05', end: '04-11' },
  // Pascha and Bright Week
  { slug: 'pascha',      label: 'Pascha',               start: '04-12', end: '04-19' },
  // Pentecost (the day and its afterfeast)
  { slug: 'pentecost',   label: 'Pentecost',            start: '05-31', end: '06-07' },

  // === FIXED FEASTS ===

  // St. Philip's Fast (Advent) — Nov 15 to Dec 24
  { slug: 'penitential', label: 'Nativity Fast',        start: '11-15', end: '12-24' },
  // Christmas — Dec 25 to Jan 4
  { slug: 'christmas',   label: 'Christmas',            start: '12-25', end: '12-31' },
  { slug: 'christmas',   label: 'Christmas',            start: '01-01', end: '01-04' },
  // Theophany — Jan 5-14
  { slug: 'theophany',   label: 'Theophany',            start: '01-05', end: '01-14' },

  // === MARIAN FEASTS (fixed dates) ===

  // Dormition of the Theotokos — Aug 15
  { slug: 'marian',      label: 'Dormition of the Theotokos', start: '08-15', end: '08-23' },
  // Nativity of the Theotokos — Sep 8
  { slug: 'marian',      label: 'Nativity of the Theotokos',  start: '09-08', end: '09-08' },
  // Protection of the Theotokos — Oct 1
  { slug: 'marian',      label: 'Protection of the Theotokos', start: '10-01', end: '10-01' },
  // Annunciation — Mar 25
  { slug: 'marian',      label: 'Annunciation',         start: '03-25', end: '03-25' },
  // Immaculate Conception — Dec 8
  { slug: 'marian',      label: 'Immaculate Conception', start: '12-08', end: '12-08' },

  // === FEASTS OF THE CROSS AND MARTYRS ===

  // Exaltation of the Cross — Sep 14
  { slug: 'penitential', label: 'Exaltation of the Cross', start: '09-14', end: '09-14' },
];

function toMMDD(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

function findCurrentRange(date: Date): DateRange | undefined {
  const mmdd = toMMDD(date);
  return dateRanges.find((range) => mmdd >= range.start && mmdd <= range.end);
}

/**
 * Returns the current theme slug based on today's date.
 *
 * This is the SINGLE POINT OF CONTROL for theming.
 * Future Google Calendar API integration only changes this function.
 */
export function getCurrentThemeSlug(date: Date = new Date()): string {
  const range = findCurrentRange(date);
  return range?.slug ?? 'default';
}

/**
 * Returns a human-readable label for the current liturgical season.
 * Used in the footer display.
 */
export function getCurrentSeasonLabel(date: Date = new Date()): string {
  const range = findCurrentRange(date);
  return range?.label ?? 'Ordinary Time';
}
