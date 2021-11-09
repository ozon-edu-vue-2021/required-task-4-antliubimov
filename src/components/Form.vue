<template>
  <form @submit.prevent="formSubmit" class="form" autocomplete="off">
    <div>
      <h3>Личные данные</h3>
      <div class="row">
        <div class="item">
          <label for="last_name"> Фамилия </label>
          <input v-model.trim="formData.lastName" type="text" id="last_name" />
        </div>
        <div class="item">
          <label for="first_name"> Имя </label>
          <input
            v-model.trim="formData.firstName"
            type="text"
            id="first_name"
          />
        </div>
        <div class="item">
          <label for="second_name"> Отчество </label>
          <input
            v-model.trim="formData.secondName"
            type="text"
            id="second_name"
          />
        </div>
      </div>
      <div class="row">
        <div class="item item-50">
          <label for="birthday"> Дата рождения </label>
          <input v-model="formData.birthday" type="date" id="birthday" />
        </div>
      </div>
      <div class="item">
        <label for="email"> E-mail </label>
        <input v-model.trim="formData.email" type="text" id="email" />
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
            v-model="formData.passport.citizenship"
            @focus="isDropdownOpen = true"
            value="formData.passport.citizenship"
          />

          <div v-if="isDropdownOpen" class="citizen_select__dropdown">
            <ul v-if="allCountries.length">
              <li
                v-for="country in allCountries"
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
          <input type="text" maxlength="4" id="series_passport" />
        </div>
        <div class="item">
          <label for="number_passport"> Номер паспорта </label>
          <input type="text" maxlength="6" id="number_passport" />
        </div>
        <div class="item">
          <label for="date_issuance"> Дата выдачи </label>
          <input type="date" id="date_issuance" />
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="item">
            <label for="foreign_last_name"> Фамилия на латинице </label>
            <input
              v-model="formData.foreignLastName"
              type="text"
              id="foreign_last_name"
            />
          </div>
          <div class="item">
            <label for="foreign_first_name"> Имя на латинице </label>
            <input
              v-model="formData.foreignFirstName"
              type="text"
              id="foreign_first_name"
            />
          </div>
        </div>
        <p class="text">
          Иностранцы заполняют латинскими буквами. Например, Ivanov Ivan.
        </p>
        <div class="row">
          <div class="item">
            <label for="foreign_series_passport"> Серия паспорта</label>
            <input type="text" id="foreign_series_passport" />
          </div>
          <div class="item">
            <label for="foreign_country_passport"> Страна выдачи </label>
            <select
              v-if="allCountries.length"
              v-model="formData.passport.country"
              id="foreign_country_passport"
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
            <select v-if="allPassportTypes.length" id="foreign_type_passport">
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
              checked
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
            />
          </div>
          <div class="item">
            <label for="old_first_name"> Имя </label>
            <input
              v-model.trim="formData.change_lastname.old_firstname"
              type="text"
              id="old_first_name"
            />
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

export default {
  data() {
    return {
      isDropdownOpen: false,
      allCountries: [],
      allPassportTypes: [],
      formData: {
        lastName: "",
        firstName: "",
        secondName: "",
        birthday: "",
        email: "",
        sex: "man",
        passport: {
          citizenship: "",
          series: "",
          number_passport: "",
          date_issues: "",
          lat_lastname: "",
          lat_firstname: "",
          country: "",
          type: "",
        },
        change_lastname: {
          change: "false",
          old_lastname: "",
          old_firstname: "",
        },
      },
    };
  },
  created() {
    this.allCountries = citizenships;
    this.allPassportTypes = passportTypes;
  },
  methods: {
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    onCountryClicked(selectedCountry) {
      this.formData.passport.citizenship = selectedCountry;
      this.hideDropdown();
    },
    isRussian() {
      return this.formData.passport.citizenship === "Russia";
    },
    changeLastName() {
      if (this.formData.change_lastname.change === "false") {
        this.formData.change_lastname.old_lastname = "";
        this.formData.change_lastname.old_firstname = "";
        return false;
      } else {
        return true;
      }
    },
    formSubmit() {
      console.log("submit", JSON.stringify(this.formData));
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
</style>
