// Sanity GROQ queries — matched to existing Sanity schemas

export const heroQuery = `*[_type == "hero"][0]{
  title,
  subtitle,
  "heroImageUrl": images[0].asset->url
}`;

// full queries (used on their respective directory pages)
export const eventsQuery = `*[_type == "event"] | order(eventDate desc){
  _id,
  title,
  eventDate,
  description,
  category,
  status,
  winnerName,
  tutorName,
  "images": images[].asset->url
}`;

export const noticesQuery = `*[_type == "notice" && status == "active"] | order(_createdAt desc){
  _id,
  title,
  description,
  category,
  showAsPopup,
  "imageUrl": image.asset->url,
  "pdf": pdf.asset->url
}`;

// lightweight versions for the home page – only the most recent items
export const homeEventsQuery = `*[_type == "event"] | order(eventDate desc)[0...5]{
  _id,
  title,
  eventDate,
  description,
  category,
  status,
  winnerName,
  tutorName,
  "images": images[].asset->url
}`;

export const homeNoticesQuery = `*[_type == "notice" && status == "active"] | order(_createdAt desc)[0...5]{
  _id,
  title,
  description,
  category,
  showAsPopup,
  "imageUrl": image.asset->url,
  "pdf": pdf.asset->url
}`;

export const teamQuery = `*[_type == "team"] | order(rank asc){
  _id,
  name,
  position,
  description,
  rank,
  committee,
  "photoUrl": photo.asset->url
}`;

export const previousCommitteesQuery = `*[_type == "previousCommittee"] | order(tenureNumber desc){
  _id,
  title,
  tenureNumber,
  years,
  description,
  "teamMembers": teamMembers[]{
    name,
    role,
    linkedin,
    socials,
    bio,
    "photoUrl": photo.asset->url
  },
  "committeePhotos": committeePhotos[]{
    caption,
    "imageUrl": image.asset->url
  }
}`;

export const previousCommitteeByTenureQuery = (tenureNumber: number | string) => `*[_type == "previousCommittee" && tenureNumber == ${Number(tenureNumber)}][0]{
  _id,
  title,
  tenureNumber,
  years,
  description,
  "teamMembers": teamMembers[]{
    name,
    role,
    linkedin,
    socials,
    bio,
    "photoUrl": photo.asset->url
  },
  "committeePhotos": committeePhotos[]{
    caption,
    "imageUrl": image.asset->url
  }
}`;

export const eventsByTenureQuery = (tenureNumber: number | string) => `*[_type == "event" && tenureNumber == ${Number(tenureNumber)}] | order(eventDate desc){
  _id,
  title,
  eventDate,
  description,
  category,
  status,
  winnerName,
  tutorName,
  tenureNumber,
  "images": images[].asset->url
}`;

export const internsQuery = `*[_type == "interns"]{
  _id,
  batchTitle,
  internsList,
  interns[]{
    name,
    batch,
    message,
    "photoUrl": photo.asset->url
  }
}`;

export const alumniBatchQuery = `*[_type == "alumniBatch"] | order(batchYear desc){
  _id,
  batchYear,
  namesList
}`;

export const magazineQuery = `*[_type == "magazine"] | order(title desc){
  _id,
  title,
  issueNumber,
  description,
  "cover": cover[0].asset->url,
  "resources": resources.asset->url
}`;

export const journalQuery = `*[_type == "journal"]{
  _id,
  category,
  title,
  batch,
  semester,
  authors,
  supervisor,
  issueNumber,
  description,
  publicationDate,
  "cover": cover[0].asset->url,
  "resources": resources.asset->url
}`;

// Library uses hardcoded Drive links (not from Sanity)

export const latestNoticeQuery = `*[_type == "notice" && status == "active" && showAsPopup == true] | order(_createdAt desc)[0]{
  _id,
  title,
  description,
  category,
  "imageUrl": image.asset->url,
  "pdf": pdf.asset->url
}`;

export const generalMembersQuery = `*[_type == "generalMembers"] | order(batch desc){
  _id,
  batch,
  membersList
}`;

export const galleryQuery = `*[_type == "gallery"] | order(date desc){
  _id,
  title,
  "imageUrl": image.asset->url,
  date
}`;
