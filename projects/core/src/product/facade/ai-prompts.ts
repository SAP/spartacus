export const SUMMARY_PROMPT =
  'Generate a review summary based on the following reviews';
export const POSITIVE_SENTIMENTS_PROMPT =
  'Based on the provided reviews please suggest up to three positive sentiment tags that are meaningful and non-spammy, in separate lines.';
export const NEGATIVE_SENTIMENTS_PROMPT =
'Based on the provided reviews please suggest up to three negative sentiment that are meaningful and non-spammy, in separate lines.';
export const COMMENT_PROMPT =
  'Generate a detailed customer review comment with approximately 30 words based on product details, review title and rating (out of 5) provided by customer';
export const SENTIMENTS_PERCENTAGE_PROMPT =
  'Provide an array with two elements representing percentages of positive and negative sentiments, ensuring that their sum equals 100';
export const FETCH_SPAM_PROMPT =
  'Provide the output as an array containing the positions of reviews that could be considered spam based on the following criteria: irrelevant content';
