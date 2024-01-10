import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Feed = (props) => {
  // console.log(props.post)

  return (
    <div className="w-9/12 h-80 w-8/12 bg-black flex flex-wrap rounded-xl p-4 border-double border-4 shadow-lg hover:shadow-slate-600 justify-self-center">
      <div className="mr-2 place-self-start max-h-24">
        <Avatar>
          <AvatarImage
            src={`${process.env.URL}/${props.post.postedBy.profilepic}`}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        
      </div>

      <div>
        <p className="self-center text-base font-extralight">
          {props.post.postedBy.name}
        </p>
        <p className="text-xs text-stone-400 thin">
          @{props.post.postedBy.username}
        </p>
      </div>
      

      <p className="w-full text-sm text-stone-300 pt-6 pb-2 pl-2 font-extralight line-clamp-3 whitespace-normal">
        {props.post.captions}
      </p>

      {props.post.mediaLinks.length > 0 ? (
        <div className="container h-40 w-full flex justify-center items-stretch gap-2  overflow-x-scroll no-scrollbar">
          {props.post.mediaLinks.map((link) => (
            <Image
              src={`${process.env.URL}/${link}`}
              width={200}
              height={200}
              style={{
                width: "auto",
                height: "auto",
              }}
              // fill={true}

              alt="postpics"
              className="rounded-md object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Feed

// {props.post.mediaLinks.map((link) => (
//   <CarouselItem key={link} >
//   <div className="min-h-full">
//     <AspectRatio ratio={16 / 9}>
//       <Image
//         src={`${process.env.URL}/${link}`}
//         fill={true}
//         alt="postpics"
//         className="rounded-md object-cover"
//       />
//     </AspectRatio>
//   </div>
// </CarouselItem>
// ))}