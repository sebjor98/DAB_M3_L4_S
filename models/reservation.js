module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      StartDate: {
        type: Sequelize.DataTypes.DATE,
        validate: {
          allowNull: false,
          isAfterCurrentDate(value) {
            if (value && this.EndDate) {
              if (new Date(value) >= new Date(this.EndDate)) {
                throw new Error("Start date must be before end date");
              }
            }
            if (value && new Date(value) <= new Date()) {
              throw new Error("Start date must be after current date");
            }
          },
          isProvided() {
            if (!this.StartDate && this.EndDate) {
              throw new Error(
                "Start date must be provided if end date is provided"
              );
            }
          },
        },
      },
      EndDate: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        validate: {
          isAfterCurrentDate(value) {
            if (value && this.StartDate) {
              if (new Date(value) <= new Date(this.StartDate)) {
                throw new Error("End date must be after start date");
              }
            }
            if (value && new Date(value) <= new Date()) {
              throw new Error("End date must be after current date");
            }
          },
          isProvided() {
            if (!this.EndDate && this.StartDate) {
              throw new Error(
                "End date must be provided if start date is provided"
              );
            }
          },
          isAtLeastOneDayApart() {
            if (this.StartDate && this.EndDate) {
              const oneDayInMillis = 24 * 60 * 60 * 1000;
              const differenceInMillis =
                new Date(this.EndDate) - new Date(this.StartDate);
              if (differenceInMillis < oneDayInMillis) {
                throw new Error(
                  "End date must be at least one day after start date"
                );
              }
            }
          },
        },
      },
    },
    {
      timestamps: false,
      hasTrigger: true,
    }
  );
  return Reservation;
};
