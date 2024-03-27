export const SUMMARY_PROMPT =
  'Generate a review summary based on the following reviews';
export const POSITIVE_SENTIMENTS_PROMPT =
  'Maximum 3 tags in separate lines with positive sentiment, ignoring spam reviews';
export const NEGATIVE_SENTIMENTS_PROMPT =
  'Maximum 3 tags in separate lines with negative sentiment, ignoring spam reviews';
export const COMMENT_PROMPT =
  'Generate a detailed customer review comment with approximately 30 words based on product details, review title and rating (out of 5) provided by customer';
export const SENTIMENTS_PERCENTAGE_PROMPT =
  'Give an array where first element is positive sentiment percentage and second element is negative sentiment percentage';
export const FETCH_SPAM_PROMPT =
  'Give an array of position of reviews which can be considered spam. A review can be considered spam if it includes irrelevant content, repetitive phrases, suspiciously positive or negative sentiments, or promotional language';
