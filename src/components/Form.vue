<template>
  <form @submit.prevent="formSubmit" class="form" autocomplete="off">
    <div>
      <h3>Личные данные</h3>
      <div class="row">
        <div class="item">
          <label for="last_name"> Фамилия </label>
          <input v-model="formData.lastName" type="text" id="last_name" />
        </div>
        <div class="item">
          <label for="first_name"> Имя </label>
          <input v-model="formData.firstName" type="text" id="first_name" />
        </div>
        <div class="item">
          <label for="second_name"> Отчество </label>
          <input v-model="formData.secondName" type="text" id="second_name" />
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
        <input v-model="formData.email" type="text" id="email" />
      </div>
      <div class="row">
        <div class="item">
          <p>Пол</p>
          <div>
            <input type="radio" id="man" name="sex" value="man" checked />
            <label for="man">Мужской</label>
            <input type="radio" id="woman" name="sex" value="woman" />
            <label for="woman">Женский</label>
          </div>
        </div>
      </div>
    </div>
    <div class="passport">
      <h3>Паспортные данные</h3>
      <div class="row">
        <div class="item">
          <label for="citizen_select">Гражданство</label>
          <select id="citizen_select">
            <option
              v-for="country in allCountries"
              :value="country.nationality"
              :key="country.id"
            >
              {{ country.nationality }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="isRussian()" class="row">
        <div class="item">
          <label for="series_passport"> Серия паспорта</label>
          <input type="text" id="series_passport" />
        </div>
        <div class="item">
          <label for="number_passport"> Номер паспорта </label>
          <input type="text" id="number_passport" />
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
            <select v-if="allCountries.length" id="foreign_country_passport">
              <option
                v-for="country in allCountries"
                :value="country.nationality"
                :key="country.id"
              >
                {{ country.nationality }}
              </option>
            </select>
            <select v-else>
              <option value="empty">Ничего не найдено</option>
            </select>
          </div>
          <div class="item">
            <label for="foreign_type_passport"> Тип паспорта </label>
            <select id="foreign_type_passport">
              <option
                v-for="type in allPassportTypes"
                :value="type.type"
                :key="type.id"
              >
                {{ type.type }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div class="item item--change_lastname">
          <p>Меняли ли фамилию?</p>
          <div>
            <input
              type="radio"
              id="no-change-fam"
              name="change-family"
              value="no"
              checked
            />
            <label for="no-change-fam">Нет</label>
            <input
              type="radio"
              id="change-fam"
              name="change-family"
              value="yes"
            />
            <label for="change-fam">Да</label>
          </div>
        </div>
        <div v-show="changeLastName()" class="row">
          <div class="item">
            <label for="old_last_name"> Фамилия </label>
            <input type="text" id="old_last_name" />
          </div>
          <div class="item">
            <label for="old_first_name"> Имя </label>
            <input type="text" id="old_first_name" />
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

export default {
  data() {
    return {
      allCountries: citizenships,
      allPassportTypes: passportTypes,
      formData: {
        lastName: "",
        firstName: "",
        secondName: "",
        birthday: "",
        email: "",
        sex: "",
        passport: {
          citizenship: "",
          series: "",
          number_passport: "",
          date_issues: "",
        },
        change_lastname: {
          change: false,
          old_lastname: "",
          old_firstname: "",
        },
      },
    };
  },

  methods: {
    isRussian() {
      return false;
    },
    changeLastName() {
      return false;
    },
    formSubmit() {
      console.log("submit", JSON.stringify(this.formData));
    },
  },
};
</script>

<style scoped>
.form {
  margin: 0 auto;
  padding: 30px;
  max-width: 1200px;
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
</style>
