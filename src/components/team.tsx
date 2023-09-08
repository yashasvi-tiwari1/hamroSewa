import Image from "next/image";

function Team() {
  const employee = [
    {
      image: "ssv.jpg",
      name: "Yashasvi Tiwari",
      position: "Frontend Developer",
    },
    {
      image: "saurab.jpg",
      name: "Saurab Bikram Sen",
      position: "Backend Developer",
    },
    {
      image: "sabin.png",
      name: "Sabin Lamichhane",
      position: "Frontend Developer",
    },
    {
      image: "sujan.png",
      name: "Sujan Thapa Magar",
      position: "UI/UX Designer",
    },
    {
      image: "rabindra.png",
      name: "Rabindra Adhikari",
      position: "Backend Developer",
    },
  ];
  return (
    <div className="container p-8 md:px-16 space-y-4">
      <p className="text-custom-blue dark:text-blue-600 text-center text-5xl font-semibold">
        Team Hamro Sewa
      </p>
      <p className="max-w-2xl mx-auto text-center md:text-xl">
        At HamroSewa, our goals are clear. We aim to ensure user satisfaction by
        providing top-notch service providers and seamless experiences.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:p-10 p-5">
        {employee.map((emp: any) => {
          return (
            <div key={emp.name}>
              <EmployeeCard employee={emp} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const EmployeeCard = ({ employee }: any) => {
  return (
    <div className="text-center   flex flex-col items-center">
      <div className="py-5 items-center">
        <Image
          height={400}
          width={400}
          src={`/assets/${employee.image}`}
          className=" w-40 h-40 overflow-hidden  rounded-full object-cover  border-2 border-spacing-3 border-custom-blue "
          alt="Hamro Sewa employee"
        />
      </div>
      <div className="font-bold">{employee.name}</div>
      <div className="text-custom-blue dark:text-blue-600 font-semibold">
        {employee.position}
      </div>
    </div>
  );
};
export default Team;
