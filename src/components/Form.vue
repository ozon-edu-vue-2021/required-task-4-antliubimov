<template>
  <form
    @submit.prevent="formSubmit"
    @keydown.enter.prevent
    class="form"
    autocomplete="off"
  >
    <div>
      <h3>Личные данные</h3>
      <div class="row">
        <div class="item">
          <label for="last_name"> Фамилия </label>
          <input
            v-model.trim="formData.lastName"
            type="text"
            id="last_name"
            :class="{ 'error--input': errors.isErrorLastName }"
            required
          />
          <span v-if="errors.isErrorLastName" class="error">
            {{ errors.isErrorLastName }}
          </span>
        </div>
        <div class="item">
          <label for="first_name"> Имя </label>
          <input
            v-model.trim="formData.firstName"
            type="text"
            id="first_name"
            :class="{ 'error--input': errors.isErrorFirstName }"
            required
          />
          <span v-if="errors.isErrorFirstName" class="error">
            {{ errors.isErrorFirstName }}
          </span>
        </div>
        <div class="item">
          <label for="second_name"> Отчество </label>
          <input
            v-model.trim="formData.secondName"
            type="text"
            id="second_name"
            :class="{ 'error--input': errors.isErrorSecondName }"
          />
          <span v-if="errors.isErrorSecondName" class="error">
            {{ errors.isErrorSecondName }}
          </span>
        </div>
      </div>
      <div class="row">
        <div class="item item-50">
          <label for="birthday"> Дата рождения </label>
          <input
            v-model="formData.birthday"
            type="date"
            id="birthday"
            :class="{ 'error--input': errors.isErrorBirthday }"
            required
          />
          <span v-if="errors.isErrorBirthday" class="error">
            {{ errors.isErrorBirthday }}
          </span>
        </div>
      </div>
      <div class="item">
        <label for="email"> E-mail </label>
        <input
          v-model.trim="formData.email"
          type="text"
          id="email"
          :class="{ 'error--input': errors.isErrorEmail }"
          required
        />
        <span v-if="errors.isErrorEmail" class="error">
          {{ errors.isErrorEmail }}
        </span>
      </div>
      <div class="row">
        <div class="item">
          <p>Пол</p>
          <div>
            <input
              v-model="formData.sex"
              type="radio"
              id="man"
              name="sex"
              value="man"
              checked
            />
            <label for="man">Мужской</label>
            <input
              v-model="formData.sex"
              type="radio"
              id="woman"
              name="sex"
              value="woman"
            />
            <label for="woman">Женский</label>
          </div>
        </div>
      </div>
    </div>
    <div class="passport">
      <h3>Паспортные данные</h3>
      <div class="row">
        <div v-click-outside="hideDropdown" class="item citizen_select__item">
          <label for="citizen_select"> Гражданство </label>
          <input
            id="citizen_select"
            v-model="searchCountry"
            @focus="isDropdownOpen = true"
            value="formData.passport.citizenship"
            required
          />
          <div v-if="isDropdownOpen" class="citizen_select__dropdown">
            <ul v-if="allFilterCountries.length">
              <li
                v-for="country in allFilterCountries"
                :key="country.id"
                @click="onCountryClicked(country.nationality)"
              >
                {{ country.nationality }}
              </li>
            </ul>
            <div v-else class="empty">Ничего не найдено</div>
          </div>
        </div>
      </div>
      <div v-if="isRussian()" class="row">
        <div class="item">
          <label for="series_passport"> Серия паспорта</label>
          <input
            v-model="formData.passport.rus_series"
            type="text"
            maxlength="4"
            id="series_passport"
            :class="{ 'error--input': errors.isErrorRusSeries }"
            required
          />
          <span v-if="errors.isErrorRusSeries" class="error">
            {{ errors.isErrorRusSeries }}
          </span>
        </div>
        <div class="item">
          <label for="number_passport"> Номер паспорта </label>
          <input
            v-model="formData.passport.rus_number"
            type="text"
            maxlength="6"
            id="number_passport"
            :class="{ 'error--input': errors.isErrorRusNumberPassport }"
            required
          />
          <span v-if="errors.isErrorRusNumberPassport" class="error">
            {{ errors.isErrorRusNumberPassport }}
          </span>
        </div>
        <div class="item">
          <label for="date_issuance"> Дата выдачи </label>
          <input
            v-model="formData.passport.rus_date_issues"
            type="date"
            id="date_issuance"
            required
          />
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="item">
            <label for="foreign_last_name"> Фамилия на латинице </label>
            <input
              v-model="formData.passport.foreign_lastname"
              type="text"
              id="foreign_last_name"
              :class="{ 'error--input': errors.isErrorForeignLastName }"
            />
            <span v-if="errors.isErrorForeignLastName" class="error">
              {{ errors.isErrorForeignLastName }}
            </span>
          </div>
          <div class="item">
            <label for="foreign_first_name"> Имя на латинице </label>
            <input
              v-model="formData.passport.foreign_firstname"
              type="text"
              id="foreign_first_name"
              :class="{ 'error--input': errors.isErrorForeignFirstName }"
            />
            <span v-if="errors.isErrorForeignFirstName" class="error">
              {{ errors.isErrorForeignFirstName }}
            </span>
          </div>
        </div>
        <p class="text">
          Иностранцы заполняют латинскими буквами. Например, Ivanov Ivan.
        </p>
        <div class="row">
          <div class="item">
            <label for="foreign_number_passport"> Номер паспорта </label>
            <input
              v-model="formData.passport.foreign_number"
              type="text"
              id="foreign_number_passport"
              maxlength="25"
              :class="{ 'error--input': errors.isErrorForeignNumberPassport }"
            />
            <span v-if="errors.isErrorForeignNumberPassport" class="error">
              {{ errors.isErrorForeignNumberPassport }}
            </span>
          </div>
          <div class="item">
            <label for="foreign_country_passport"> Страна выдачи </label>
            <select
              v-if="allCountries.length"
              v-model="formData.passport.foreign_country"
              id="foreign_country_passport"
              required
            >
              <option
                v-for="country in allCountries"
                :value="country.nationality"
                :key="country.id"
              >
                {{ country.nationality }}
              </option>
            </select>
            <select v-else id="foreign_country_passport">
              <option value="empty">Ничего не найдено</option>
            </select>
          </div>
          <div class="item">
            <label for="foreign_type_passport"> Тип паспорта </label>
            <select
              v-if="allPassportTypes.length"
              v-model="formData.passport.foreign_type"
              id="foreign_type_passport"
              required
            >
              <option
                v-for="type in allPassportTypes"
                :value="type.type"
                :key="type.id"
              >
                {{ type.type }}
              </option>
            </select>
            <select v-else>
              <option value="empty">Ничего не найдено</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div class="item item--change_lastname">
          <p>Меняли ли фамилию?</p>
          <div>
            <input
              v-model="formData.change_lastname.change"
              type="radio"
              id="no-change-fam"
              name="change-family"
              value="false"
            />
            <label for="no-change-fam">Нет</label>
            <input
              v-model="formData.change_lastname.change"
              type="radio"
              id="change-fam"
              name="change-family"
              value="true"
            />
            <label for="change-fam">Да</label>
          </div>
        </div>
        <div v-show="changeLastName()" class="row">
          <div class="item">
            <label for="old_last_name"> Фамилия </label>
            <input
              v-model.trim="formData.change_lastname.old_lastname"
              type="text"
              id="old_last_name"
              :class="{ 'error--input': errors.isErrorOldLastName }"
            />
            <span v-if="errors.isErrorOldLastName" class="error">
              {{ errors.isErrorOldLastName }}
            </span>
          </div>
          <div class="item">
            <label for="old_first_name"> Имя </label>
            <input
              v-model.trim="formData.change_lastname.old_firstname"
              type="text"
              id="old_first_name"
              :class="{ 'error--input': errors.isErrorOldFirstName }"
            />
            <span v-if="errors.isErrorOldFirstName" class="error">
              {{ errors.isErrorOldFirstName }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row row--button">
      <button class="btn">Отправить</button>
    </div>
  </form>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passportTypes from "@/assets/data/passport-types.json";
import ClickOutside from "vue-click-outside";
// import throttle from "../helpers/throttle";
import debounce from "../helpers/debounce";

export default {
  data() {
    return {
      isDropdownOpen: false,
      allCountries: [],
      allFilterCountries: [],
      allPassportTypes: [],
      searchCountry: "",
      formData: {
        lastName: "",
        firstName: "",
        secondName: "",
        birthday: "",
        email: "",
        sex: "man",
        passport: {
          citizenship: "",
          rus_series: "",
          rus_number: "",
          rus_date_issues: "",
          foreign_lastname: "",
          foreign_firstname: "",
          foreign_number: "",
          foreign_country: "",
          foreign_type: "",
        },
        change_lastname: {
          change: "false",
          old_lastname: "",
          old_firstname: "",
        },
      },
      errors: {
        isErrorLastName: "",
        isErrorFirstName: "",
        isErrorSecondName: "",
        isErrorOldLastName: "",
        isErrorOldFirstName: "",
        isErrorBirthday: "",
        isErrorEmail: "",
        isErrorRusSeries: "",
        isErrorRusNumberPassport: "",
        isErrorForeignNumberPassport: "",
        isErrorForeignLastName: "",
        isErrorForeignFirstName: "",
      },
    };
  },
  created() {
    this.allCountries = citizenships;
    this.allFilterCountries = citizenships;
    this.allPassportTypes = passportTypes;
    // this.throttleSearchCountries = throttle(this.getCountries, 2000);
    this.debounceSearchCountries = debounce(this.getCountries, 2000);
  },
  watch: {
    searchCountry(newValue) {
      // this.throttleSearchCountries(newValue);
      this.debounceSearchCountries(newValue);
    },
  },
  methods: {
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    onCountryClicked(selectedCountry) {
      this.clearValues(this.formData.passport);
      this.formData.passport.citizenship = selectedCountry;
      this.searchCountry = selectedCountry;
      this.hideDropdown();
    },
    getCountries(searchCountry) {
      this.allFilterCountries = citizenships.filter((country) =>
        country.nationality.toLowerCase().includes(searchCountry.toLowerCase())
      );
    },
    isRussian() {
      return this.formData.passport.citizenship === "Russia";
    },
    changeLastName() {
      if (this.formData.change_lastname.change === "false") {
        this.formData.change_lastname.old_lastname = "";
        this.formData.change_lastname.old_firstname = "";
        this.errors.isErrorOldLastName = "";
        this.errors.isErrorOldFirstName = "";
        return false;
      }
      return true;
    },
    formSubmit() {
      this.validInput(
        this.validRussian,
        this.formData.lastName,
        this.errors,
        "isErrorLastName",
        "Вводите только русские буквы"
      );
      this.validInput(
        this.validRussian,
        this.formData.firstName,
        this.errors,
        "isErrorFirstName",
        "Вводите только русские буквы"
      );
      this.validInput(
        this.validRussian,
        this.formData.secondName,
        this.errors,
        "isErrorSecondName",
        "Вводите только русские буквы"
      );
      if (this.formData.change_lastname.change === "true") {
        this.validInput(
          this.validRussian,
          this.formData.change_lastname.old_lastname,
          this.errors,
          "isErrorOldLastName",
          "Вводите только русские буквы"
        );
        this.validInput(
          this.validRussian,
          this.formData.change_lastname.old_firstname,
          this.errors,
          "isErrorOldFirstName",
          "Вводите только русские буквы"
        );
      }
      if (!this.isRussian()) {
        this.validInput(
          this.validEnglish,
          this.formData.passport.foreign_lastname,
          this.errors,
          "isErrorForeignLastName",
          "Вводите текст на латинице"
        );
        this.validInput(
          this.validEnglish,
          this.formData.passport.foreign_firstname,
          this.errors,
          "isErrorForeignFirstName",
          "Вводите текст на латинице"
        );
        this.validInput(
          this.validNumber,
          this.formData.passport.foreign_number,
          this.errors,
          "isErrorForeignNumberPassport",
          "Вводите только цифры"
        );
      }
      if (this.isRussian()) {
        this.validInput(
          this.validRussianPassportSeries,
          this.formData.passport.rus_series,
          this.errors,
          "isErrorRusSeries",
          "Вводите только 4 цифр"
        );
        this.validInput(
          this.validRussianPassportNumber,
          this.formData.passport.rus_number,
          this.errors,
          "isErrorRusNumberPassport",
          "Вводите только 6 цифр"
        );
      }

      this.validInput(
        this.validEmail,
        this.formData.email,
        this.errors,
        "isErrorEmail",
        "Введите корректный email"
      );

      this.validInput(
        this.validDate,
        this.formData.birthday,
        this.errors,
        "isErrorBirthday",
        "Вы из будущего?"
      );

      if (this.isNotErrors(this.errors)) {
        console.log("submit", JSON.stringify(this.formData));
      }
    },
    clearValues(obj) {
      for (const objKey in obj) {
        obj[objKey] = "";
      }
    },
    validInput(fn, data, objErr, err, message) {
      objErr[err] = !data || !fn(data) ? message : "";
    },
    isNotErrors(objErrors) {
      return Object.values(objErrors).every((err) => err.length === 0);
    },

    // const reValidRussian = /^[а-яА-Я]+$/;
    // const reValidEnglish = /^[a-zA-Z]+$/;
    // const reValidNumber = /^\d+$/;
    // const reValidRussianPassportNumber = /^\d{6}$/;
    // const reValidRussianPassportSeries = /^\d{4}$/;
    // const reValidEmail =
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    validRussian(str) {
      const re = /^[а-яА-Я]+$/;
      return re.test(str);
    },
    validDate(str) {
      let selectDate = new Date(str);
      let now = new Date();
      return +selectDate < +now;
    },
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validEnglish(str) {
      const re = /^[a-zA-Z]+$/;
      return re.test(str);
    },
    validNumber(str) {
      const re = /^\d+$/;
      return re.test(str);
    },
    validRussianPassportNumber(str) {
      const re = /^\d{6}$/;
      return re.test(str);
    },
    validRussianPassportSeries(str) {
      const re = /^\d{4}$/;
      return re.test(str);
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
.form {
  margin: 0 auto;
  padding: 30px;
  max-width: 1200px;
  min-width: 705px;
  font-size: 20px;
  background-color: #ffffff;
  border: 1px solid #dbdfe6;
  border-radius: 5px;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}
.row--button {
  justify-content: flex-end;
}

.item {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #8e9bac;
}
.item:not(:last-child) {
  margin-right: 30px;
}
.item-50 {
  width: 50%;
}
.item--change_lastname {
  margin-bottom: 20px;
}
input,
select {
  padding: 5px 10px;
  font-size: 16px;
  border: 3px solid #dadee5;
  border-radius: 5px;
  outline: none;
}

input:active,
input:focus,
input:hover,
select:active,
select:focus,
select:hover {
  border: 3px solid #269af7;
}

input[type="radio"] + label {
  margin-right: 30px;
}
.btn {
  padding: 15px 20px;
  background-color: #265af7;
  font-size: 20px;
  color: #ffffff;
  border: none;
  border-radius: 5px;
}
.passport {
  margin-bottom: 60px;
}
.text {
  font-size: 12px;
  margin-top: -15px;
}
.citizen_select__item {
  position: relative;
}

.citizen_select__dropdown {
  position: absolute;
  top: 60px;
  width: 100%;
  border: 3px solid #dadee5;
  border-radius: 5px;
  color: #000000;
  background-color: #ffffff;
}
.citizen_select__dropdown ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
  cursor: pointer;
}
.citizen_select__dropdown li,
.citizen_select__dropdown div {
  padding: 10px 20px;
}
.citizen_select__dropdown li:hover {
  color: #ffffff;
  background-color: #269af7;
}
.error {
  font-size: 12px;
  color: #f72645;
}

.error--input {
  border-color: #f72645;
}
</style>
