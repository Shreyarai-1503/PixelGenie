<h3 align="center">💜🌠 PixelGenie</h3>

## 📋 <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Quick Start](#quick-start)

## <a name="introduction">Introduction</a>

I recently built an AI image SaaS platform that excels in advanced image processing capabilities. The project integrates a secure payment infrastructure and offers cutting-edge image search functionalities. It supports multiple AI features, including image restoration, recoloring, object removal, generative filling, and background removal.

This project has been an incredible learning experience and a significant boost to my portfolio.



## <a name="tech-stack">Tech Stack</a>

- Next.js
- TypeScript
- TailwindCSS
- Shadcn
- Clerk
- MongoDB
- Cloudinary
- Stripe



## <a name="features">Features</a>

**User Authentication**: Secure registration, login, and route protection.

**Community Gallery**: Explore user transformations with pagination.

**Smart Image Search**: Find images by content or objects quickly.

**Photo Restoration**: Revive old or damaged images.

**Color Adjustment**: Replace colors of objects easily.

**Generative Fill**: Fill in missing areas seamlessly.

**Object Eraser**: Remove unwanted objects precisely.

**Background Remover**: Extract objects from backgrounds effortlessly.

**Image Download**: Save and share transformed images.

**Transformation Details**: View details of each transformation.

**Credit System**: Earn or purchase credits for transformations.

**User Profile**: Access personal images and credit info.

**Credit Purchase**: Securely buy credits via Stripe.

**Responsive Design**: Seamless experience across devices.



## <a name="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)

**Cloning the Repository**

```bash
git clone https://github.com/Shreyarai-1503/PixelGenie.git
cd PixelGenie
```
**Important Note**: To avoid errors, change folder name to lowercase.

**Installation**

Install the project dependencies using npm:

```bash
npm i
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#NEXT
NEXT_PUBLIC_SERVER_URL=

#MONGODB
MONGODB_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Replace the placeholder values with your actual respective account credentials. You can obtain these credentials by signing up on the [Clerk](https://clerk.com/), [MongoDB](https://www.mongodb.com/), [Cloudinary](https://cloudinary.com/) and [Stripe](https://stripe.com)

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
